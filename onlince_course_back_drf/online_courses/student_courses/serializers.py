from rest_framework import serializers

from .models import Student, Course, StudentCourse
from .tasks import send_course_register_email


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name', 'description', 'duration')


class CourseWithCreatedAtSerializer(CourseSerializer):
    created_at = serializers.DateTimeField()

    class Meta(CourseSerializer.Meta):
        fields = CourseSerializer.Meta.fields + ('created_at',)


class StudentSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[])
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

    def validate(self, attrs):
        email = attrs.get('email')
        course_id = attrs.get('course_id')

        try:
            Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            raise serializers.ValidationError(f"Course with ID {course_id} does not exist")

        try:
            student = Student.objects.get(email=email)
        except Student.DoesNotExist:
            return attrs

        if StudentCourse.objects.filter(student=student, course_id=course_id).exists():
            raise serializers.ValidationError(f"Student: {email} is already registered in this course")

        return attrs

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

        course = StudentCourse.objects.create(student=student, course_id=course_id)
        send_course_register_email.delay(str(course).split(' - ')[-1], email)

        return student