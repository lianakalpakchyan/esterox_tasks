from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

from .models import Student, Course
from .serializers import StudentSerializer, CourseSerializer


class StudentPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'


class StudentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    pagination_class = StudentPagination


class CourseListAPIView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
