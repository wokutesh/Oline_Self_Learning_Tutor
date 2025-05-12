from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from .models import (User,Grade,Subject,Question,Choice,UserAnswer,Lesson,Submission
,Video,PDF,Assignment,Quiz,SubjectProgress,Notification, Parent,VideoProgress)
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_str
from rest_framework.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.conf import settings

#serializer for register
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        min_length=8,
        error_messages={
            'min_length': 'Password must be at least 8 characters long.'
        }
    )
    confirm_password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    grade_document = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = [
            'email', 'name', 'password', 'confirm_password', 'gender',
            'profile_photo', 'grade_document', 'address', 'current_grade',
            'b_date', 'created_at', 'is_active', 'is_staff'
        ]
        read_only_fields = ['created_at', 'is_active', 'is_staff']

    def validate(self, data):
        # Check if passwords match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({
                'confirm_password': 'Passwords do not match.'
            })

        # Validate password strength
        try:
            validate_password(data['password'])
        except ValidationError as e:
            raise serializers.ValidationError({
                'password': list(e.messages)
            })

        # Validate grade document requirement
        current_grade = data.get('current_grade')
        grade_document = data.get('grade_document')

        if current_grade and current_grade.grade_no != 1 and not grade_document:
            raise serializers.ValidationError({
                'grade_document': 'If not starting from grade 1, you must upload a document showing your previous grade.'
            })

        return data

    def create(self, validated_data):
        # Remove confirm_password from the data
        validated_data.pop('confirm_password')
        
        # Create user with hashed password
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            **{k: v for k, v in validated_data.items() if k not in ['email', 'password']}
        )
        return user

# serializer for login

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'}
    )

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            raise serializers.ValidationError("Both email and password are required.")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password.")

        if not user.is_active:
            raise serializers.ValidationError("This account is inactive. Please contact support.")

        if not user.check_password(password):
            raise serializers.ValidationError("Invalid email or password.")

        data["user"] = user
        return data

class LogoutSerializer(serializers.Serializer):
    # Optional: Include any extra fields you might want to log or validate
    message = serializers.CharField(read_only=True)

    def save(self, **kwargs):
        user = self.context['request'].user
        user.auth_token.delete()  # Delete token to logout
        return {"message": "Successfully logged out"}


# forgot password serializer

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email doesn't exist")
        return value

    def save(self):
        email = self.validated_data['email']
        user = User.objects.get(email=email)

        # Generate a token
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        # Send email with reset link
        reset_link = f"http://{get_current_site(self.context['request']).domain}/reset-password/{uid}/{token}/"
        subject = "Password Reset Request"
        message = f"Hi {user.name},\n\nClick the link below to reset your password:\n{reset_link}"
        
        send_mail(subject, message, 'wokumateshome1@gmail.com', [email])

        return user

    # reset password serializer

class ResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        new_password = attrs.get('new_password')
        confirm_password = attrs.get('confirm_password')

        if new_password != confirm_password:
            raise serializers.ValidationError("Passwords do not match.")
        
        # Validate password strength
        try:
            validate_password(new_password)
        except ValidationError as e:
            raise serializers.ValidationError({'new_password': list(e.messages)})

        return attrs

    def save(self, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError("Invalid user or token.")
        
        if not default_token_generator.check_token(user, token):
            raise serializers.ValidationError("Invalid token.")

        user.set_password(self.validated_data['new_password'])
        user.save()
        return user


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['id', 'grade_no', 'created_at']
    
    def validate_grade_no(self, value):
        if not 1 <= value <= 12:
            raise serializers.ValidationError("Grade number must be between 1 and 12.")
        return value

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id','text','is_correct','question']
        extra_kwargs = {
            'id': {'read_only': True},
        }   

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True)
    subject = serializers.CharField()

    class Meta:
        model = Question
        fields = ['id', 'title', 'q_type', 'correct_answer', 'point_worth', 'related_type', 'grade', 'subject', 'language', 'created_at', 'is_active', 'choices']

    def create(self, validated_data):
        choices_data = validated_data.pop('choices')
        subject_name = validated_data.pop('subject')

        try:
            subject = Subject.objects.get(name=subject_name)
        except Subject.DoesNotExist:
            raise serializers.ValidationError({"subject": [f"Subject '{subject_name}' does not exist."]})

        question = Question.objects.create(subject=subject, **validated_data)

        for choice_data in choices_data:
            Choice.objects.create(question=question, **choice_data)

        return question

class UserAnswerSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())
    selected_choice = serializers.PrimaryKeyRelatedField(queryset=Choice.objects.all(), allow_null=True, required=False)
    text_answer = serializers.CharField(allow_blank=True, required=False)

    class Meta:
        model = UserAnswer
        fields = ['id', 'user', 'question', 'selected_choice', 'text_answer', 'is_correct', 'score_awarded', 'submitted_at']
        read_only_fields = ['is_correct', 'score_awarded', 'submitted_at']

    def validate(self, data):
        question = data.get('question')
        selected_choice = data.get('selected_choice')
        text_answer = data.get('text_answer')

        if question.q_type in ['MCQ', 'TF'] and not selected_choice:
            raise serializers.ValidationError({'selected_choice': 'This field is required for MCQ or TF questions.'})

        if question.q_type in ['SA', 'LA'] and not text_answer:
            raise serializers.ValidationError({'text_answer': 'This field is required for SA or LA questions.'})

        return data

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user

        question = validated_data['question']
        selected_choice = validated_data.get('selected_choice')
        text_answer = validated_data.get('text_answer')

        # Logic to check correctness
        if question.q_type in ['MCQ']:
            validated_data['is_correct'] = selected_choice and selected_choice.is_correct
        elif question.q_type in ['TF']:
            validated_data['is_correct'] = text_answer.strip().lower() == question.correct_answer.strip().lower()
        elif question.q_type in ['SA', 'LA']:
            correct = question.correct_answer.strip().lower() if question.correct_answer else ""
            answer = text_answer.strip().lower() if text_answer else ""
            validated_data['is_correct'] = (answer == correct)

        # Score
        validated_data['score_awarded'] = question.point_worth if validated_data['is_correct'] else 0

        return super().create(validated_data)

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'description', 'grade', 'subject', 'language', 'order_no', 'created_at']

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = [
            'id', 'lesson', 'title', 'description', 'video_url',
            'language', 'thumbnail', 'duration_seconds', 'created_at'
        ]

class PDFSerializer(serializers.ModelSerializer):
    class Meta:
        model = PDF
        fields = ['id', 'lesson', 'title', 'description', 'pdf_file', 'language', 'created_at']

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = [
            'id', 'title', 'description', 'subject', 'grade',
            'due_date', 'created_at', 'is_active', 'max_points'
        ]

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = [
            'id', 'title', 'description', 'subject',
            'grade', 'video', 'created_at', 'max_point', 'is_active'
        ]

class SubmissionSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')  # Auto-set from request
    assignment = serializers.PrimaryKeyRelatedField(queryset=Assignment.objects.all(), required=False)
    quiz = serializers.PrimaryKeyRelatedField(queryset=Quiz.objects.all(), required=False)

    class Meta:
        model = Submission
        fields = [
            'id', 'user', 'assignment', 'quiz', 'submission_type', 'submitted_date', 
            'submitted_file', 'grade', 'feedback'
        ]
        read_only_fields = ['submitted_date', 'grade', 'feedback']

    def validate(self, data):
        if not data.get('assignment') and not data.get('quiz'):
            raise serializers.ValidationError("Either 'assignment' or 'quiz' must be provided.")
        return data

class SubjectProgressSerializer(serializers.ModelSerializer):
    lesson_completion_percentage = serializers.ReadOnlyField()

    class Meta:
        model = SubjectProgress
        fields = [
            'id', 'user', 'grade', 'subject',
            'quizzes_completed', 'assignments_submitted',
            'videos_watched', 'total_score',
            'completed_lessons', 'last_updated',
            'lesson_completion_percentage'
        ]
        read_only_fields = ['user', 'last_updated', 'lesson_completion_percentage']

    def update(self, instance, validated_data):
        lessons = validated_data.pop('completed_lessons', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if lessons:
            instance.completed_lessons.add(*lessons)

        instance.save()
        return instance

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'text', 'text_type', 'is_read', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

class ParentRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        min_length=8,
        error_messages={
            'min_length': 'Password must be at least 8 characters long.'
        }
    )
    confirm_password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    student_ids = serializers.ListField(
        child=serializers.CharField(max_length=10),
        write_only=True,
        required=True,
        help_text="List of student IDs to link with this parent"
    )

    class Meta:
        model = Parent
        fields = ['name', 'email', 'password', 'confirm_password', 'student_ids']

    def validate(self, data):
        # Check if passwords match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({
                'confirm_password': 'Passwords do not match.'
            })

        # Validate password strength
        try:
            validate_password(data['password'])
        except ValidationError as e:
            raise serializers.ValidationError({
                'password': list(e.messages)
            })

        return data

    def validate_student_ids(self, value):
        User = get_user_model()
        for student_id in value:
            if not User.objects.filter(student_id=student_id).exists():
                raise serializers.ValidationError(f"Student with ID {student_id} does not exist")
        return value

    def create(self, validated_data):
        student_ids = validated_data.pop('student_ids')
        password = validated_data.pop('password')
        validated_data.pop('confirm_password')  # Remove confirm_password as it's not needed
        
        # Create parent
        parent = Parent.objects.create(**validated_data)
        parent.set_password(password)
        parent.save()
        
        # Link students
        User = get_user_model()
        students = User.objects.filter(student_id__in=student_ids)
        parent.students.set(students)
        
        return parent

class ParentLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'})

class ParentPasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            self.parent = Parent.objects.get(email=value)
        except Parent.DoesNotExist:
            raise serializers.ValidationError("No parent account found with this email address.")
        return value

    def save(self):
        parent = self.parent
        token = default_token_generator.make_token(parent)
        uid = urlsafe_base64_encode(force_bytes(parent.pk))
        
        # Use backend URL
        backend_url = getattr(settings, 'BACKEND_URL', 'http://localhost:8000')
        reset_url = f"{backend_url}/parent/reset-password/{uid}/{token}/"
        
        # Send email
        subject = 'Password Reset Request'
        message = f'Please use the following link to reset your password: {reset_url}'
        from_email = settings.DEFAULT_FROM_EMAIL
        to_email = parent.email
        
        try:
            send_mail(subject, message, from_email, [to_email])
        except Exception as e:
            raise serializers.ValidationError(f"Failed to send reset email: {str(e)}")

class ParentForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            self.parent = Parent.objects.get(email=value)
        except Parent.DoesNotExist:
            raise serializers.ValidationError("No parent account found with this email address.")
        return value

    def save(self):
        parent = self.parent
        token = default_token_generator.make_token(parent)
        uid = urlsafe_base64_encode(force_bytes(parent.pk))
        
        # Use backend URL
        backend_url = getattr(settings, 'BACKEND_URL', 'http://localhost:8000')
        reset_url = f"{backend_url}/parent/reset-password/{uid}/{token}/"
        
        # Send email
        subject = 'Password Reset Request'
        message = f'Please use the following link to reset your password: {reset_url}'
        from_email = settings.DEFAULT_FROM_EMAIL
        to_email = parent.email
        
        try:
            send_mail(subject, message, from_email, [to_email])
        except Exception as e:
            raise serializers.ValidationError(f"Failed to send reset email: {str(e)}")

class VideoProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoProgress
        fields = ['id', 'user', 'video', 'is_completed', 'watched_duration', 'last_position', 'last_updated']
        read_only_fields = ['user', 'last_updated']

    def validate(self, data):
        video = data.get('video')
        watched_duration = data.get('watched_duration', 0)
        
        if video and video.duration_seconds:
            if watched_duration > video.duration_seconds:
                raise serializers.ValidationError("Watched duration cannot exceed video duration")
            
            # Auto-set is_completed if watched more than 90%
            if (watched_duration / video.duration_seconds) >= 0.9:
                data['is_completed'] = True
        
        return data