from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (User,Grade,Subject,Question,Choice,UserAnswer,Lesson,Video,PDF,Assignment,Quiz,
Submission,SubjectProgress,Notification,Parent,Feedback,Support,VideoProgress)

class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['email', 'name', 'is_staff']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('name', 'profile_photo', 'b_date','current_grade','student_id')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'b_date', 'password1', 'password2'),
        }),
    )

admin.site.register(User, UserAdmin)
admin.site.register(Grade)
admin.site.register(Subject)
admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(UserAnswer)
admin.site.register(Lesson)
admin.site.register(Video)
admin.site.register(PDF)
admin.site.register(Assignment)
admin.site.register(Quiz)
admin.site.register(Submission)
admin.site.register(SubjectProgress)
admin.site.register(Notification)
admin.site.register(Parent)
admin.site.register(Feedback)
admin.site.register(Support)
admin.site.register(VideoProgress)
