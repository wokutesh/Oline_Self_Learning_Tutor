from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,permissions, serializers
from rest_framework.exceptions import PermissionDenied
from rest_framework.authtoken.models import Token 
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .serializers import (RegisterSerializer,LoginSerializer,GradeSerializer,ForgotPasswordSerializer,
ResetPasswordSerializer,LogoutSerializer,SubjectSerializer,QuestionSerializer,ChoiceSerializer,LessonSerializer,
VideoSerializer,PDFSerializer,AssignmentSerializer,QuizSerializer,SubmissionSerializer,
SubjectProgressSerializer,NotificationSerializer, ParentRegistrationSerializer,
    ParentLoginSerializer,
    ParentPasswordResetRequestSerializer,
    ParentForgotPasswordSerializer, VideoProgressSerializer)
from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from .models import (User, Grade, Subject, Question, Choice, UserAnswer, Lesson, Submission,
    Video, PDF, Assignment, Quiz, SubjectProgress, Notification, Parent, VideoProgress, ParentToken)


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "User created"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "email": user.email,
                "user_id": user.id
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = LogoutSerializer(data={}, context={'request': request})
        if serializer.is_valid():
            data = serializer.save()
            return Response(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
# forgot password view


class ForgotPasswordView(APIView):
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({'detail': 'Password reset link sent.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# reset password view

class ResetPasswordView(APIView):
    def post(self, request, uidb64, token):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save(uidb64=uidb64, token=token)
                return Response({'detail': 'Password has been reset.'}, status=status.HTTP_200_OK)
            except serializers.ValidationError as e:
                return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GradeListCreateView(APIView):
    def get(self, request):
        grades = Grade.objects.all()
        serializer = GradeSerializer(grades, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = GradeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GradeDetailView(APIView):
    def get_object(self, pk):
        try:
            return Grade.objects.get(pk=pk)
        except Grade.DoesNotExist:
            return None

    def get(self, request, pk):
        grade = self.get_object(pk)
        if not grade:
            return Response({'error': 'Grade not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = GradeSerializer(grade)
        return Response(serializer.data)

    def put(self, request, pk):
        grade = self.get_object(pk)
        if not grade:
            return Response({'error': 'Grade not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = GradeSerializer(grade, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        grade = self.get_object(pk)
        if not grade:
            return Response({'error': 'Grade not found'}, status=status.HTTP_404_NOT_FOUND)
        grade.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Subject view 
class SubjectListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get user's current grade
        user_grade = request.user.current_grade
        if not user_grade:
            return Response(
                {"detail": "No grade assigned to user. Please contact support."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Filter subjects by user's grade
        subjects = Subject.objects.filter(grade=user_grade)
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SubjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SubjectDetailView(APIView):
    def get_object(self, pk):
        try:
            return Subject.objects.get(pk=pk)
        except Subject.DoesNotExist:
            return None

    def get(self, request, pk):
        subject = self.get_object(pk)
        if not subject:
            return Response({"error": "Subject not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = SubjectSerializer(subject)
        return Response(serializer.data)

    def put(self, request, pk):
        subject = self.get_object(pk)
        if not subject:
            return Response({"error": "Subject not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = SubjectSerializer(subject, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        subject = self.get_object(pk)
        if not subject:
            return Response({"error": "Subject not found."}, status=status.HTTP_404_NOT_FOUND)
        subject.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class QuestionCreateView(APIView):
    def post(self, request):
        # Serialize the request data using the QuestionSerializer
        serializer = QuestionSerializer(data=request.data)
        
        if serializer.is_valid():
            # Create the Question and its choices
            question = serializer.save()
            return Response({
                'message': 'Question and choices created successfully!',
                'question': QuestionSerializer(question).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChoiceListCreateView(APIView):
    def get(self, request):
        choices = Choice.objects.all()
        serializer = ChoiceSerializer(choices, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ChoiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SubmitUserAnswerView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = UserAnswerSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()  # save() will call the custom create() method in the serializer
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LessonListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get user's current grade
        user_grade = request.user.current_grade
        if not user_grade:
            return Response(
                {"detail": "No grade assigned to user. Please contact support."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Filter lessons by user's grade
        lessons = Lesson.objects.filter(grade=user_grade).order_by('order_no')
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data)

class CanTakeQuizView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, video_id):
        try:
            video = Video.objects.get(id=video_id)
        except Video.DoesNotExist:
            return Response({'detail': 'Video not found'}, status=404)

        try:
            progress = VideoProgress.objects.get(user=request.user, video=video)
            if progress.is_video_completed():
                return Response({'can_take_quiz': True})
            else:
                return Response({
                    'can_take_quiz': False,
                    'detail': 'Complete watching the video first',
                    'progress': {
                        'watched_duration': progress.watched_duration,
                        'total_duration': video.duration_seconds,
                        'completion_percentage': (progress.watched_duration / video.duration_seconds * 100) if video.duration_seconds else 0
                    }
                }, status=403)
        except VideoProgress.DoesNotExist:
            return Response({
                'can_take_quiz': False,
                'detail': 'You must watch the video first',
                'progress': None
            }, status=403)

class LessonVideoListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, lesson_id):
        try:
            # Get user's current grade
            user_grade = request.user.current_grade
            if not user_grade:
                return Response(
                    {"detail": "No grade assigned to user. Please contact support."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Get lesson and verify it belongs to user's grade
            lesson = Lesson.objects.get(id=lesson_id, grade=user_grade)
        except Lesson.DoesNotExist:
            return Response({'detail': 'Lesson not found or not accessible'}, status=404)

        videos = lesson.videos.all()
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)


class LessonPDFListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, lesson_id):
        try:
            # Get user's current grade
            user_grade = request.user.current_grade
            if not user_grade:
                return Response(
                    {"detail": "No grade assigned to user. Please contact support."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Get lesson and verify it belongs to user's grade
            lesson = Lesson.objects.get(id=lesson_id, grade=user_grade)
        except Lesson.DoesNotExist:
            return Response({"detail": "Lesson not found or not accessible"}, status=404)

        pdfs = lesson.pdfs.all()
        serializer = PDFSerializer(pdfs, many=True)
        return Response(serializer.data)
class QuizAccessView(APIView):
    def get(self, request, quiz_id):
        # Get the quiz instance
        quiz = Quiz.objects.get(id=quiz_id)

        # Get the related video for this quiz
        video = quiz.video

        if video:
            # Check if the user has completed the video
            try:
                progress = UserVideoProgress.objects.get(user=request.user, video=video)
            except UserVideoProgress.DoesNotExist:
                raise PermissionDenied("You must complete the video before taking the quiz.")

        # If no video is associated, or the video is completed, allow access
        return Response({"message": "You can take the quiz!"}, status=status.HTTP_200_OK)

class AssignmentListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get user's current grade
        user_grade = request.user.current_grade
        if not user_grade:
            return Response(
                {"detail": "No grade assigned to user. Please contact support."},
                status=status.HTTP_400_BAD_REQUEST
            )

        subject_id = request.query_params.get('subject')

        # Filter assignments by user's grade
        queryset = Assignment.objects.filter(is_active=True, grade=user_grade)

        if subject_id:
            queryset = queryset.filter(subject_id=subject_id)

        serializer = AssignmentSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AssignmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QuizListAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        video_id = request.query_params.get('video')
        subject_id = request.query_params.get('subject')

        # Get user's current grade
        user_grade = user.current_grade
        if not user_grade:
            return Response(
                {"detail": "No grade assigned to user. Please contact support."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Filter quizzes by user's grade
        quizzes = Quiz.objects.filter(is_active=True, grade=user_grade)

        if video_id:
            # Check if user has completed the video
            try:
                video_progress = VideoProgress.objects.get(user=user, video_id=video_id)
                if not video_progress.is_video_completed():
                    return Response({
                        "detail": "You must complete watching the video before taking the quiz.",
                        "video_progress": {
                            "watched_duration": video_progress.watched_duration,
                            "total_duration": video_progress.video.duration_seconds,
                            "completion_percentage": (video_progress.watched_duration / video_progress.video.duration_seconds * 100) if video_progress.video.duration_seconds else 0
                        }
                    }, status=status.HTTP_403_FORBIDDEN)
            except VideoProgress.DoesNotExist:
                return Response({
                    "detail": "You must watch the video before taking the quiz.",
                    "video_progress": None
                }, status=status.HTTP_403_FORBIDDEN)
            
            quizzes = quizzes.filter(video_id=video_id)

        if subject_id:
            quizzes = quizzes.filter(subject_id=subject_id)

        serializer = QuizSerializer(quizzes, many=True)
        return Response(serializer.data)

class SubmissionAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        List all submissions for the current user.
        Optionally filter by assignment or quiz.
        """
        user = request.user
        submission_type = request.query_params.get('submission_type')
        assignment_id = request.query_params.get('assignment')
        quiz_id = request.query_params.get('quiz')

        submissions = Submission.objects.filter(user=user)

        if submission_type:
            submissions = submissions.filter(submission_type=submission_type)
        if assignment_id:
            submissions = submissions.filter(assignment_id=assignment_id)
        if quiz_id:
            submissions = submissions.filter(quiz_id=quiz_id)

        serializer = SubmissionSerializer(submissions, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Submit an assignment or quiz. Each user can submit once per assignment or quiz.
        """
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            submission_type = serializer.validated_data['submission_type']
            assignment = serializer.validated_data.get('assignment')
            quiz = serializer.validated_data.get('quiz')

            # Check if it's an assignment submission
            if submission_type == 'assignment' and assignment:
                if Submission.objects.filter(user=request.user, assignment=assignment).exists():
                    return Response(
                        {"detail": "You have already submitted this assignment."},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            # Check if it's a quiz submission
            elif submission_type == 'quiz' and quiz:
                if Submission.objects.filter(user=request.user, quiz=quiz).exists():
                    return Response(
                        {"detail": "You have already submitted this quiz."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SubjectStartAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, grade_id, subject_id):
        grade = get_object_or_404(Grade, pk=grade_id)
        subject = get_object_or_404(Subject, pk=subject_id)

        # Auto-create progress if it doesn't exist
        progress, created = SubjectProgress.objects.get_or_create(
            user=request.user,
            subject=subject,
            grade=grade
        )

        if created:
            message = "Subject progress started."
        else:
            message = "Subject progress already exists."

        serializer = SubjectProgressSerializer(progress)
        return Response({
            "message": message,
            "progress": serializer.data
        }, status=status.HTTP_200_OK)

class NotificationAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        List all notifications for the authenticated user.
        Optional query params:
        - is_read: true/false
        - text_type: general, assignment, quiz, etc.
        """
        user = request.user
        notifications = Notification.objects.filter(user=user)

        is_read = request.query_params.get('is_read')
        text_type = request.query_params.get('text_type')

        if is_read is not None:
            notifications = notifications.filter(is_read=is_read.lower() == 'true')
        if text_type:
            notifications = notifications.filter(text_type=text_type)

        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

    def patch(self, request, pk):
        """
        Mark a notification as read/unread by ID.
        """
        notification = get_object_or_404(Notification, pk=pk, user=request.user)
        is_read = request.data.get('is_read')

        if is_read is None:
            return Response({"detail": "'is_read' field is required."}, status=status.HTTP_400_BAD_REQUEST)

        notification.is_read = is_read
        notification.save()
        serializer = NotificationSerializer(notification)
        return Response(serializer.data)

class ParentRegistrationView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ParentRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            parent = serializer.save()
            return Response({
                'message': 'Parent registered successfully',
                'parent_id': parent.id
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ParentLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ParentLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            
            try:
                parent = Parent.objects.get(email=email)
                if parent.check_password(password):
                    # Generate token for the parent using ParentToken
                    token, created = ParentToken.objects.get_or_create(parent=parent)
                    return Response({
                        'message': 'Login successful',
                        'parent_id': parent.id,
                        'token': token.key,
                        'email': parent.email
                    })
                return Response({
                    'error': 'Invalid credentials'
                }, status=status.HTTP_401_UNAUTHORIZED)
            except Parent.DoesNotExist:
                return Response({
                    'error': 'Parent not found'
                }, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ParentPasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ParentPasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response({
                    'message': 'Password reset instructions have been sent to your email.',
                    'detail': 'Please check your email for the password reset link.'
                }, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({
                    'error': 'Failed to send reset email.',
                    'detail': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ParentForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ParentForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response({
                    'message': 'Password reset instructions have been sent to your email.',
                    'detail': 'Please check your email for the password reset link.'
                }, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({
                    'error': 'Failed to send reset email.',
                    'detail': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetStudentByIDView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, student_id):
        try:
            student = User.objects.get(student_id=student_id)
            return Response({
                'student_id': student.student_id,
                'name': student.name,
                'email': student.email,
                'current_grade': student.current_grade.grade_no if student.current_grade else None
            })
        except User.DoesNotExist:
            return Response({
                'error': 'Student not found'
            }, status=status.HTTP_404_NOT_FOUND)

class VideoProgressView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, video_id):
        try:
            video = Video.objects.get(id=video_id)
        except Video.DoesNotExist:
            return Response({"detail": "Video not found"}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()
        data['user'] = request.user.id
        data['video'] = video_id

        try:
            progress = VideoProgress.objects.get(user=request.user, video=video)
            serializer = VideoProgressSerializer(progress, data=data, partial=True)
        except VideoProgress.DoesNotExist:
            serializer = VideoProgressSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, video_id):
        try:
            progress = VideoProgress.objects.get(user=request.user, video_id=video_id)
            serializer = VideoProgressSerializer(progress)
            return Response(serializer.data)
        except VideoProgress.DoesNotExist:
            return Response({
                "detail": "No progress found for this video",
                "video_id": video_id,
                "watched_duration": 0,
                "is_completed": False
            })

class ParentLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            # Get the parent user
            parent = request.user
            if not isinstance(parent, Parent):
                return Response({
                    'error': 'Only parent accounts can use this endpoint'
                }, status=status.HTTP_403_FORBIDDEN)

            # Delete the parent token if it exists
            try:
                parent.auth_token.delete()
            except ParentToken.DoesNotExist:
                pass

            return Response({
                'message': 'Successfully logged out'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class ParentResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            parent = Parent.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, Parent.DoesNotExist):
            return Response({
                'error': 'Invalid reset link'
            }, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(parent, token):
            return Response({
                'error': 'Invalid or expired reset link'
            }, status=status.HTTP_400_BAD_REQUEST)

        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not new_password or not confirm_password:
            return Response({
                'error': 'Both new password and confirm password are required'
            }, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({
                'error': 'Passwords do not match'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            from django.contrib.auth.password_validation import validate_password
            validate_password(new_password)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

        parent.set_password(new_password)
        parent.save()

        return Response({
            'message': 'Password has been reset successfully'
        }, status=status.HTTP_200_OK)