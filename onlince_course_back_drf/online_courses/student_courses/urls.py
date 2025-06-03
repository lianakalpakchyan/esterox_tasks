from django.urls import path
from . import views


urlpatterns = [
    path('students/', views.StudentListCreateAPIView.as_view(), name='students'),
    path('courses/', views.CourseListAPIView.as_view(), name='courses')
]