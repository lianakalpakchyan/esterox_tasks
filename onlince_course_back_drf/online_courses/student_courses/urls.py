from django.urls import path
from . import views


urlpatterns = [
    path('student_courses/', views.StudentCourseListCreateAPIView.as_view(), name='student_courses'),
    path('courses/', views.status_choices_view, name='courses')
]