from django.contrib import admin

from .models import Student, Course, StudentCourse

class StudentCourseInline(admin.TabularInline):
    model = StudentCourse


class StudentAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'email',
        'phone_number',
        'referral'
    )
    inlines = [StudentCourseInline]


class CourseAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'description',
        'duration'
    )


class StudentCourseAdmin(admin.ModelAdmin):
    list_display = (
        'student',
        'course',
        'created_at'
    )

admin.site.register(Student, StudentAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(StudentCourse, StudentCourseAdmin)
