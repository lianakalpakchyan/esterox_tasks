from django.contrib.auth.hashers import make_password
from django.core.validators import MinLengthValidator
from django.db import models


class CourseChoices(models.TextChoices):
    PYTHON = '🐍 Python for Beginners'
    JS = '⚡ JavaScript Essentials'
    HTMLCSS = '🎨 HTML & CSS Basics'
    DATA = '📊 Data Analysis with Python'


class StudentCourse(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=255, validators=[MinLengthValidator(6, message="The field must be at least 6 characters long.")])
    phone_number = models.CharField(max_length=255, null=True, blank=True)
    course = models.CharField(max_length=100, choices=CourseChoices.choices)
    referral = models.CharField(max_length=500, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
