# Django REST Framework App

A simple Django REST Framework (DRF) application connected to a PostgreSQL database.

## Setup Instructions

```bash
# (Optional) Create and activate a virtual environment
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Copy environment variables template and fill in the values
cp .env.example .env

# Install dependencies
pip install -r requirements.txt

# Apply database migrations
python manage.py migrate

# Run celery to send emails
celery -A student_courses worker

# Run the development server
python manage.py runserver
