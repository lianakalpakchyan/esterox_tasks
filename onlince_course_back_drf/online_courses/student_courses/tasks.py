from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings


@shared_task
def send_course_register_email(course, student_email):
    subject = f"Welcome to '{course}' course"
    message = f"You have successfully registered for '{course}' course. CONGRATULATIONS!"
    return send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [student_email])
