from django.contrib.auth.hashers import make_password
from django.core.validators import MinLengthValidator, RegexValidator
from django.db import models
from django.forms import model_to_dict

PHONE_REGEX = RegexValidator(
    regex=r'^\+?1?\d{9,15}$',
    message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
)


class Course(models.Model):
    class Meta:
        db_table = 'course'

    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    duration = models.PositiveIntegerField(help_text="Duration in days")

    def __str__(self):
        return self.name


class Student(models.Model):
    class Meta:
        db_table = 'student'
        indexes = [
            models.Index(fields=['email']),
        ]

    full_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255, validators=[MinLengthValidator(6, message="The field must be at least 6 characters long.")])
    phone_number = models.CharField(validators=[PHONE_REGEX], max_length=17, blank=True, null=True)
    referral = models.CharField(max_length=500, null=True, blank=True)
    courses = models.ManyToManyField(Course, through="StudentCourse")

    def __str__(self):
        return self.email

    def set_password(self, raw_password):
        self.password = make_password(raw_password)


    def get_courses_with_created_at(self):
        return [
            {
                **model_to_dict(sc.course),
                'created_at': sc.created_at
            }
            for sc in StudentCourse.objects.select_related('course').filter(student=self)
        ]


class StudentCourse(models.Model):
    class Meta:
        db_table = 'student_course'
        unique_together = ('student', 'course')

    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.student} - {self.course}'
