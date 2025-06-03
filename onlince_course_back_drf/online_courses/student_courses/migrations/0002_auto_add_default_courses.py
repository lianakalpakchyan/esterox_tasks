from django.db import migrations


def add_default_courses(apps, schema_editor):
    Course = apps.get_model('student_courses', 'Course')
    default_courses = [
        {
            "name": "🐍 Python for Beginners",
            "description": "Learn the fundamentals of Python programming from scratch.",
            "duration": 6,
        },
        {
            "name": "⚡ JavaScript Essentials",
            "description": "Master the core concepts of JavaScript used in web development.",
            "duration": 5,
        },
        {
            "name": "🎨 HTML & CSS Basics",
            "description": "Build and style web pages using HTML and CSS.",
            "duration": 4,
        },
        {
            "name": "📊 Data Analysis with Python",
            "description": "Analyze and visualize data using Python libraries like Pandas and Matplotlib.",
            "duration": 8,
        },
    ]
    for course in default_courses:
        Course.objects.get_or_create(name=course["name"], description=course["description"], duration=course["duration"])

class Migration(migrations.Migration):

    dependencies = [
        ('student_courses', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(add_default_courses),
    ]
