from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (RegisterView,LoginView,GradeListCreateView, GradeDetailView,ForgotPasswordView,
ResetPasswordView,LogoutView,SubjectListCreateView,SubjectDetailView,QuestionCreateView,ChoiceListCreateView,
SubmitUserAnswerView,LessonListView, CanTakeQuizView,LessonVideoListView,LessonPDFListView
, AssignmentListCreateAPIView,QuizListAPIView,SubmissionAPIView,SubjectStartAPIView,NotificationAPIView,
ParentRegistrationView, ParentLoginView, ParentPasswordResetRequestView, ParentForgotPasswordView,
GetStudentByIDView, VideoProgressView, ParentLogoutView, ParentResetPasswordView)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('grades/', GradeListCreateView.as_view(), name='grade-list'),
    path('grades/<int:pk>/', GradeDetailView.as_view(), name='grade-detail'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/<uidb64>/<token>/', ResetPasswordView.as_view(), name='reset-password'),
    path('subjects/', SubjectListCreateView.as_view(), name='subject-list-create'),
    path('subjects/<int:pk>/', SubjectDetailView.as_view(), name='subject-detail'),
    path('questions/', QuestionCreateView.as_view(), name='question-create'),
    path('questions/', ChoiceListCreateView.as_view(), name='choice-list-create'),
    path('answers/', ChoiceListCreateView.as_view(), name='submit-answer'),
    path('lessons/', LessonListView.as_view(), name='lesson-list'),
    path('lessons/<int:lesson_id>/can-take-quiz/', CanTakeQuizView.as_view(), name='can-take-quiz'),
    path('lessons/<int:lesson_id>/videos/', LessonVideoListView.as_view(), name='lesson-videos'),
    path('lessons/<int:lesson_id>/pdfs/', LessonPDFListView.as_view(), name='lesson-pdfs'),
    path('assignments/', AssignmentListCreateAPIView.as_view(), name='assignment-list-create'),
    path('quizzes/', QuizListAPIView.as_view(), name='quiz-list'),
    path('submission/', SubmissionAPIView.as_view(), name='submission'),
    path('subject-progress/<int:grade_id>/<int:subject_id>/', SubjectStartAPIView.as_view(), name='subject-progress'),
    path('', NotificationAPIView.as_view(), name='notification-list'),  
    path('<int:pk>/', NotificationAPIView.as_view(), name='notification-detail'),
    path('parent/register/', ParentRegistrationView.as_view(), name='parent-register'),
    path('parent/login/', ParentLoginView.as_view(), name='parent-login'),
    path('parent/logout/', ParentLogoutView.as_view(), name='parent-logout'),
    path('parent/forgot-password/', ParentForgotPasswordView.as_view(), name='parent-forgot-password'),
    path('parent/reset-password/<uidb64>/<token>/', ParentResetPasswordView.as_view(), name='parent-reset-password'),
    path('student/<str:student_id>/', GetStudentByIDView.as_view(), name='get-student-by-id'),
    path('videos/<int:video_id>/progress/', VideoProgressView.as_view(), name='video-progress'),
]


