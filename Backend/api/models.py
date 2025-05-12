from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
import binascii
import os

# Custom User Manager
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_("Email is required"))
        email = self.normalize_email(email)
        
        # Default current_grade to Grade 1 if not provided
        current_grade = extra_fields.get('current_grade', None)
        if not current_grade:
            try:
                current_grade = Grade.objects.get(grade_no=1)
            except ObjectDoesNotExist:
                # Option 1: Create Grade 1 if missing
                current_grade = Grade.objects.create(grade_no=1)
                
                
        extra_fields['current_grade'] = current_grade

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault('b_date', '2000-01-01')
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("Email address"), unique=True)
    name = models.CharField(_("Full name"), max_length=255)
    password = models.CharField(_("Password"), max_length=128, default='')
    student_id = models.CharField(_("Student ID"), max_length=10, unique=True, null=True, blank=True)
    gender = models.CharField(max_length=20, null=True, blank=True)
    profile_photo = models.ImageField(_("Profile photo"), upload_to='profile_photos/', blank=True, null=True)
    grade_document = models.FileField(upload_to='grade_documents/', null=True, blank=True)
    address = models.CharField(max_length=20, null=True, blank=True)
    current_grade = models.ForeignKey('Grade', verbose_name=_("Current grade"), null=True, blank=True, on_delete=models.SET_NULL)
    b_date = models.DateField(_("Date of birth"), null=False, blank=True)
    created_at = models.DateField(_("Created at"), auto_now_add=True)

    is_active = models.BooleanField(_("Is active"), default=True)
    is_staff = models.BooleanField(_("Is staff"), default=False)

    # Add related_name for groups and user_permissions
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groups'),
        blank=True,
        help_text=_(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name='student_user_set',
        related_query_name='student_user'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name='student_user_set',
        related_query_name='student_user'
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        if not self.student_id and not self.is_staff:  # Only generate for students, not staff
            # Generate a unique 6-digit student ID
            import random
            while True:
                student_id = ''.join([str(random.randint(0, 9)) for _ in range(6)])
                if not User.objects.filter(student_id=student_id).exists():
                    self.student_id = student_id
                    break
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email

# Parent model
class Parent(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(_("Full name"), max_length=255)
    email = models.EmailField(_("Email address"), unique=True)
    password = models.CharField(_("Password"), max_length=128, default='')
    students = models.ManyToManyField('User', related_name='parents', verbose_name=_("Linked Students"))
    created_at = models.DateTimeField(_("Created At"), default=timezone.now)
    is_active = models.BooleanField(_("Is Active"), default=True)
    is_staff = models.BooleanField(_("Is Staff"), default=False)

    # Add related_name for groups and user_permissions
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groups'),
        blank=True,
        help_text=_(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name='parent_user_set',
        related_query_name='parent_user'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name='parent_user_set',
        related_query_name='parent_user'
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.name} ({self.email})"

    class Meta:
        verbose_name = _("Parent")
        verbose_name_plural = _("Parents")
        ordering = ['name']
        
# Grade Model
class Grade(models.Model):
    grade_no = models.PositiveIntegerField(
        _("Grade number"),
        unique=True,
        validators=[MinValueValidator(1), MaxValueValidator(12)]
    )
    
    created_at = models.DateTimeField(_("Created at"), default=timezone.now)

    def __str__(self):
        return f"{_('Grade')} {self.grade_no}"

# Subject Model

class Subject(models.Model):
    name = models.CharField(_("Name"), max_length=100)
    description = models.TextField(_("Description"))
    grade = models.ForeignKey("Grade", on_delete=models.CASCADE, related_name="subjects", verbose_name=_("Grade"))
    created_at = models.DateTimeField(_("Created At"), default=timezone.now)

    def __str__(self):
        return self.name

# Question Model

class Question(models.Model):
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('am', 'Amharic'),
        ('om', 'Oromo'),
    ]

    class QuestionType(models.TextChoices):
        MULTIPLE_CHOICE = 'MCQ', _('Multiple Choice')
        TRUE_FALSE = 'TF', _('True/False')
        SHORT_ANSWER = 'SA', _('Short Answer')
        LONG_ANSWER = 'LA', _('Long Answer')

    class RelatedTo(models.TextChoices):
        ASSIGNMENT = 'assignment', _('Assignment')
        QUIZ = 'quiz', _('Quiz')

    title = models.CharField(_("Title"), max_length=255)
    description = models.TextField(_("Description"), blank=True)
    q_type = models.CharField(_("Question Type"), max_length=10, choices=QuestionType.choices)

    # Used only for TF, SA, LA
    correct_answer = models.TextField(
        _("Correct Answer"),
        help_text=_("Used for TF/SA/LA. For MCQ, use related Choices."),
        blank=True,
        null=True
    )

    point_worth = models.PositiveIntegerField(_("Point Worth"), default=1)
    related_type = models.CharField(_("Related To"), max_length=20, choices=RelatedTo.choices)

    grade = models.ForeignKey('Grade', on_delete=models.CASCADE, verbose_name=_("Grade"))
    subject = models.ForeignKey('Subject', on_delete=models.CASCADE, verbose_name=_("Subject"))
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default='en')
    created_at = models.DateTimeField(_("Created At"), default=timezone.now)

    is_active = models.BooleanField(_("Is Active"), default=True)

    def __str__(self):
        return f"{self.title} ({self.q_type})"

# Choice Model 
class Choice(models.Model):
    question = models.ForeignKey('Question', related_name='choices', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.text} ({'Correct' if self.is_correct else 'Wrong'})"

# userAnswer model

User = get_user_model()

class UserAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey('Question', on_delete=models.CASCADE)
    selected_choice = models.ForeignKey('Choice', null=True, blank=True, on_delete=models.SET_NULL)
    text_answer = models.TextField(blank=True, null=True)
    is_correct = models.BooleanField(default=False)
    score_awarded = models.PositiveIntegerField(default=0)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Check answer correctness and score
        if self.question.q_type == 'MCQ':
            self.is_correct = self.selected_choice and self.selected_choice.is_correct
        elif self.question.q_type == 'TF':
            self.is_correct = self.text_answer.strip().lower() == self.question.correct_answer.strip().lower()
        elif self.question.q_type in ['SA', 'LA']:
            # For now, do simple match — you could later add AI or regex match
            self.is_correct = self.text_answer.strip().lower() == self.question.correct_answer.strip().lower()
        
        # Score based on correctness
        self.score_awarded = self.question.point_worth if self.is_correct else 0
        super().save(*args, **kwargs)

# Lesson Model

class Lesson(models.Model):
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('am', 'Amharic'),
        ('om', 'Oromo'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    grade = models.ForeignKey('Grade', on_delete=models.CASCADE)
    subject = models.ForeignKey('Subject', on_delete=models.CASCADE)
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default='en')
    order_no = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.get_language_display()})"

class VideoProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='video_progress')
    video = models.ForeignKey('Video', on_delete=models.CASCADE, related_name='progress')
    is_completed = models.BooleanField(default=False)
    watched_duration = models.PositiveIntegerField(default=0)  # in seconds
    last_position = models.PositiveIntegerField(default=0)  # in seconds
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'video')
        verbose_name = _("Video Progress")
        verbose_name_plural = _("Video Progress")

    def __str__(self):
        return f"{self.user.email} - {self.video.title}"

    def is_video_completed(self):
        # Consider video completed if watched at least 90% of the duration
        if self.video.duration_seconds:
            return (self.watched_duration / self.video.duration_seconds) >= 0.9
        return self.is_completed

# Video model

class Video(models.Model):
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('am', 'Amharic'),
        ('om', 'Oromo'),
    ]

    lesson = models.ForeignKey("Lesson", on_delete=models.CASCADE, related_name="videos", null=True, blank=True, verbose_name=_("Lesson"))
    title = models.CharField(_("Title"), max_length=255)
    description = models.TextField(_("Description"), blank=True)
    subject = models.ForeignKey('Subject', on_delete=models.CASCADE, verbose_name=_("Subject"), null=True, blank=True)
    grade = models.ForeignKey('Grade', on_delete=models.CASCADE, verbose_name=_("Grade"), null=True, blank=True)
    video_url = models.URLField(_("Video URL"))
    language = models.CharField(_("Language"), max_length=2, choices=LANGUAGE_CHOICES, default='en')
    thumbnail = models.ImageField(_("Thumbnail"), upload_to="video_thumbnails/", blank=True, null=True)
    duration_seconds = models.PositiveIntegerField(_("Duration (in seconds)"), null=True, blank=True)
    created_at = models.DateTimeField(_("Created At"), default=timezone.now)

    class Meta:
        ordering = ['lesson__order_no', 'title']
        verbose_name = _("Video")
        verbose_name_plural = _("Videos")

    def __str__(self):
        return f"{self.title} ({self.get_language_display()} - Lesson: {self.lesson.title if self.lesson else 'No Lesson'})"

# PDF model

class PDF(models.Model):
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('am', 'Amharic'),
        ('om', 'Oromo'),
    ]
    lesson = models.ForeignKey("Lesson", on_delete=models.CASCADE, related_name="pdfs", null=True, blank=True, verbose_name=_("Lesson"))
    title = models.CharField(_("Title"), max_length=255)
    description = models.TextField(_("Description"), blank=True)
    pdf_file = models.FileField(_("PDF File"), upload_to="pdfs/")
    grade = models.ForeignKey("Grade", on_delete=models.CASCADE, verbose_name=_("Grade"))
    subject = models.ForeignKey("Subject", on_delete=models.CASCADE, verbose_name=_("Subject"))
    language = models.CharField(_("Language"), max_length=2, choices=LANGUAGE_CHOICES, default='en')
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)

    class Meta:
        ordering = ['grade', 'subject', 'title']
        unique_together = ('title', 'grade', 'subject', 'language')

    def __str__(self):
        return f"{self.title} ({self.get_language_display()} - Grade {self.grade.grade_no})"


# Assignment Model

class Assignment(models.Model):
    title = models.CharField(_("Title"), max_length=255)
    description = models.TextField(_("Description"))
    subject = models.ForeignKey('Subject', on_delete=models.CASCADE, verbose_name=_("Subject"))
    grade = models.ForeignKey('Grade', on_delete=models.CASCADE, verbose_name=_("Grade"))
    due_date = models.DateTimeField(_("Due date"), null=True, blank=True)
    created_at = models.DateTimeField(_("Created at"), default=timezone.now)

    is_active = models.BooleanField(_("Is active"), default=True)  # Indicates whether the assignment is active
    max_points = models.PositiveIntegerField(_("Maximum points"), null=True, blank=True)  # Optional, max points for the assignment

    
    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _("Assignment")
        verbose_name_plural = _("Assignments")
        ordering = ['due_date']  # Sort assignments by due date

# QuizPrdogress model

class Quiz(models.Model):
    title = models.CharField(_("Title"), max_length=255)
    description = models.TextField(_("Description"), blank=True)
    subject = models.ForeignKey('Subject', on_delete=models.CASCADE, verbose_name=_("Subject"))
    grade = models.ForeignKey('Grade', on_delete=models.CASCADE, verbose_name=_("Grade"))
    video = models.ForeignKey('Video', on_delete=models.CASCADE, verbose_name=_("Video"), null=True, blank=True)
    created_at = models.DateTimeField(_("Created At"), default=timezone.now)
    max_point = models.PositiveIntegerField(_("Max Points"), default=100)
    is_active = models.BooleanField(_("Is Active"), default=True)

    def __str__(self):
        return f"Quiz: {self.title}"

    class Meta:
        ordering = ['-created_at']
# Submission Model

class Submission(models.Model):
    SUBMISSION_TYPE_CHOICES = [
        ('assignment', 'Assignment'),
        ('quiz', 'Quiz')
    ]

    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='submissions')
    # Can be either an Assignment or a Quiz
    assignment = models.ForeignKey('Assignment', on_delete=models.CASCADE, related_name='submissions', null=True, blank=True)
    quiz = models.ForeignKey('Quiz', on_delete=models.CASCADE, related_name='submissions', null=True, blank=True)
    submission_type = models.CharField(
        max_length=10, choices=SUBMISSION_TYPE_CHOICES, default='assignment'
    )
    submitted_date = models.DateTimeField(default=timezone.now)
    submitted_file = models.FileField(upload_to='submissions/', null=True, blank=True)  # Optional file submission
    grade = models.PositiveIntegerField(null=True, blank=True)
    feedback = models.TextField(null=True, blank=True)

    def __str__(self):
        if self.submission_type == 'assignment':
            return f"Assignment Submission by {self.user.email} for {self.assignment.title}"
        elif self.submission_type == 'quiz':
            return f"Quiz Submission by {self.user.email} for {self.quiz.title}"

    class Meta:
        verbose_name = "Submission"
        verbose_name_plural = "Submissions"
        ordering = ['-submitted_date']

# Progress model

class SubjectProgress(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='subject_progress')
    grade = models.ForeignKey('Grade', on_delete=models.CASCADE)
    subject = models.ForeignKey('Subject', on_delete=models.CASCADE)

    quizzes_completed = models.PositiveIntegerField(default=0)
    assignments_submitted = models.PositiveIntegerField(default=0)
    videos_watched = models.PositiveIntegerField(default=0)
    total_score = models.PositiveIntegerField(default=0)

    completed_lessons = models.ManyToManyField('Lesson', blank=True, related_name='subject_progress_lessons')
    last_updated = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('user', 'grade', 'subject')
        verbose_name = "Subject Progress"
        verbose_name_plural = "Subject Progress"

    def __str__(self):
        return f"{self.user.email} - {self.subject.name} (Grade {self.grade.grade_no})"

    def save(self, *args, **kwargs):
        self.last_updated = timezone.now()
        super().save(*args, **kwargs)

    @property
    def lesson_completion_percentage(self):
        total_lessons = Lesson.objects.filter(subject=self.subject, grade=self.grade).count()
        if total_lessons == 0:
            return 0
        return int((self.completed_lessons.count() / total_lessons) * 100)

# Notification model

class Notification(models.Model):
    class TextType(models.TextChoices):
        GENERAL = 'general', _('General')
        ASSIGNMENT = 'assignment', _('Assignment')
        QUIZ = 'quiz', _('Quiz')
        MESSAGE = 'message', _('Message')
        PROGRESS = 'progress', _('Progress Update')

    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='notifications')
    text = models.TextField(_("Notification Text"))
    text_type = models.CharField(_("Type"), max_length=20, choices=TextType.choices, default=TextType.GENERAL)
    is_read = models.BooleanField(_("Is Read"), default=False)
    created_at = models.DateTimeField(_("Created At"), default=timezone.now)

    def __str__(self):
        return f"{self.user.email} - {self.text_type} - {self.created_at.strftime('%Y-%m-%d')}"

# Feedback model
class Feedback(models.Model):
    class FeedbackType(models.TextChoices):
        ASSIGNMENT = 'assignment', _('Assignment')
        QUIZ = 'quiz', _('Quiz')
        GENERAL = 'general', _('General Progress')

    subject = models.ForeignKey('Subject', on_delete=models.CASCADE, verbose_name=_("Subject"))
    grade = models.ForeignKey('Grade', on_delete=models.CASCADE, verbose_name=_("Grade"))
    feedback_type = models.CharField(_("Feedback Type"), max_length=20, choices=FeedbackType.choices)
    content = models.TextField(_("Feedback Content"))
    rating = models.PositiveIntegerField(
        _("Rating"),
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text=_("Rating from 1 to 5")
    )
    student = models.ForeignKey('User', on_delete=models.CASCADE, related_name='received_feedback', verbose_name=_("Student"))
    created_at = models.DateTimeField(_("Created At"), default=timezone.now)
    is_anonymous = models.BooleanField(_("Is Anonymous"), default=False)

    def __str__(self):
        return f"{self.get_feedback_type_display()} Feedback for {self.student.email} - {self.subject.name} (Grade {self.grade.grade_no})"

    class Meta:
        verbose_name = _("Feedback")
        verbose_name_plural = _("Feedback")
        ordering = ['-created_at']

# Support model
class Support(models.Model):
    class IssueType(models.TextChoices):
        TECHNICAL = 'technical', _('Technical Issue')
        ACADEMIC = 'academic', _('Academic Support')
        ACCOUNT = 'account', _('Account Issue')
        OTHER = 'other', _('Other')

    class Status(models.TextChoices):
        PENDING = 'pending', _('Pending')
        IN_PROGRESS = 'in_progress', _('In Progress')
        RESOLVED = 'resolved', _('Resolved')
        CLOSED = 'closed', _('Closed')

    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='support_requests', verbose_name=_("User"))
    issue_type = models.CharField(_("Issue Type"), max_length=20, choices=IssueType.choices)
    subject = models.CharField(_("Subject"), max_length=255)
    message = models.TextField(_("Message"))
    status = models.CharField(_("Status"), max_length=20, choices=Status.choices, default=Status.PENDING)
    admin_response = models.TextField(_("Admin Response"), blank=True, null=True)
    created_at = models.DateTimeField(_("Created At"), default=timezone.now)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)
    resolved_at = models.DateTimeField(_("Resolved At"), null=True, blank=True)

    def __str__(self):
        return f"Support Request from {self.user.email} - {self.subject} ({self.get_status_display()})"

    class Meta:
        verbose_name = _("Support Request")
        verbose_name_plural = _("Support Requests")
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        # Update resolved_at when status changes to RESOLVED
        if self.status == self.Status.RESOLVED and not self.resolved_at:
            self.resolved_at = timezone.now()
        super().save(*args, **kwargs)

class ParentToken(models.Model):
    parent = models.OneToOneField(Parent, on_delete=models.CASCADE, related_name='auth_token')
    key = models.CharField(_("Key"), max_length=40, primary_key=True)
    created = models.DateTimeField(_("Created"), auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.key:
            self.key = self.generate_key()
        return super().save(*args, **kwargs)

    def generate_key(self):
        return binascii.hexlify(os.urandom(20)).decode()

    def __str__(self):
        return self.key

