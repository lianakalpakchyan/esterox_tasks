from rest_framework import serializers

from .models import StudentCourse


class StudentCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCourse
        fields = (
            'id',
            'full_name',
            'email',
            'password',
            'phone_number',
            'course',
            'referral',
            'created_at'
        )
        extra_kwargs = {
            'password': {'write_only': True},
            'created_at': {'read_only': True},
            'id': {'read_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')  
        student_course = StudentCourse(**validated_data)  
        student_course.set_password(password)  
        student_course.save()
        return student_course
