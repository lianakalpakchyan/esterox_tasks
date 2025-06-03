from rest_framework import serializers

from .models import Student, Course, StudentCourse


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name', 'description', 'duration')


class CourseWithCreatedAtSerializer(CourseSerializer):
    created_at = serializers.DateTimeField()

    class Meta(CourseSerializer.Meta):
        fields = CourseSerializer.Meta.fields + ('created_at',)


class StudentSerializer(serializers.ModelSerializer):
    course_id = serializers.IntegerField(write_only=True)
    courses = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = (
            'id',
            'full_name',
            'email',
            'password',
            'phone_number',
            'referral',
            'course_id',
            'courses'
        )
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True},
        }

    def get_courses(self, obj):
        course_data = obj.get_courses_with_created_at()
        return CourseWithCreatedAtSerializer(course_data, many=True).data

    def create(self, validated_data):
        email = validated_data.pop('email')
        course_id = validated_data.pop('course_id')

        try:
            student = Student.objects.get(email=email)
        except Student.DoesNotExist:
            password = validated_data.pop('password')
            student = Student(email=email, **validated_data)
            student.set_password(password)
            student.save()

        if not StudentCourse.objects.filter(student=student, course_id=course_id).exists():
            StudentCourse.objects.create(student=student, course_id=course_id)
        else:
            raise serializers.ValidationError(f"Student: {email} is already involved in this course")


        return student

