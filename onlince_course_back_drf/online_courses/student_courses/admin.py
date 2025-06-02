from django.contrib import admin

from .models import StudentCourse

class StudentCourseAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'email',
        'phone_number',
        'course',
        'referral',
        'created_at'
    )

admin.site.register(StudentCourse, StudentCourseAdmin)