from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import StudentCourse, CourseChoices
from .serializers import StudentCourseSerializer

class StudentCoursePagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'

class StudentCourseListCreateAPIView(generics.ListCreateAPIView):
    queryset = StudentCourse.objects.order_by('-created_at')
    serializer_class = StudentCourseSerializer
    pagination_class = StudentCoursePagination


@api_view(['GET'])
def status_choices_view(request):
    choices = [{'option': choice.value, 'value': str(choice.label).lower()} for choice in CourseChoices]
    return Response(choices)