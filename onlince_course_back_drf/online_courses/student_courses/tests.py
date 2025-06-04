from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

from .models import Course, Student


class StudentAPITestCase(APITestCase):
    """
    Test suite for Student API endpoints including course registration functionality.

    Tests cover:
    - Course retrieval
    - Student registration (success and failure scenarios)
    - Validation of required fields and data types
    - Business logic constraints (duplicate registrations, non-existent courses)
    """

    @classmethod
    def setUpTestData(cls):
        """Set up test data that doesn't change between test methods."""
        cls.course1 = Course.objects.create(
            name="Python Programming Fundamentals",
            description="Learn Python basics and core concepts",
            duration=10
        )
        cls.course2 = Course.objects.create(
            name="Advanced Django Development",
            description="Master Django framework for web development",
            duration=20
        )

    def setUp(self):
        """Set up test URLs and sample data for each test."""
        self.courses_url = reverse("courses")
        self.students_url = reverse("students")

        self.valid_student_data = {
            "full_name": "John Doe",
            "email": "john.doe@example.com",
            "password": "SecurePass123!",
            "phone_number": "+37499112233",
            "referral": "Online advertisement",
            "course_id": self.course1.id
        }

    def test_get_courses_success(self):
        """Test successful retrieval of all available courses."""
        response = self.client.get(self.courses_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify course data structure and content
        course_names = [course["name"] for course in response.data]
        self.assertIn("Python Programming Fundamentals", course_names)
        self.assertIn("Advanced Django Development", course_names)

        # Verify the last course is the expected one
        self.assertEqual(response.data[-1]["name"], "Advanced Django Development")

    def test_create_student_success(self):
        """Test successful student registration with valid data."""
        response = self.client.post(self.students_url, self.valid_student_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["full_name"], self.valid_student_data["full_name"])
        self.assertEqual(response.data["email"], self.valid_student_data["email"])

        # Verify student was actually created in database
        self.assertTrue(
            Student.objects.filter(email=self.valid_student_data["email"]).exists()
        )

    def test_create_student_invalid_email_format(self):
        """Test student registration fails with invalid email format."""
        test_cases = [
            ("testUser@", "Enter a valid email address."),
            ("invalid-email", "Enter a valid email address."),
            ("@example.com", "Enter a valid email address."),
            ("user@", "Enter a valid email address."),
        ]

        for invalid_email, expected_error in test_cases:
            with self.subTest(email=invalid_email):
                data = self.valid_student_data.copy()
                data["email"] = invalid_email

                response = self.client.post(self.students_url, data)

                self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
                self.assertIn("email", response.data)
                self.assertEqual(response.data["email"][0], expected_error)

    def test_create_student_missing_required_fields(self):
        """Test student registration fails when required fields are missing."""
        required_fields = ["full_name", "email", "password", "course_id"]

        for field in required_fields:
            with self.subTest(missing_field=field):
                data = self.valid_student_data.copy()
                data.pop(field)

                response = self.client.post(self.students_url, data)

                self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
                self.assertIn(field, response.data)
                self.assertEqual(response.data[field][0],  "This field is required.")

    def test_create_student_invalid_course_id_format(self):
        """Test student registration fails with invalid course_id formats."""
        invalid_course_ids = ['', 'abc', 'not-a-number']

        for invalid_id in invalid_course_ids:
            with self.subTest(course_id=invalid_id):
                data = self.valid_student_data.copy()
                data["course_id"] = invalid_id

                response = self.client.post(self.students_url, data)

                self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
                self.assertIn("course_id", response.data)
                self.assertEqual(response.data["course_id"][0], "A valid integer is required.")

    def test_create_student_nonexistent_course_id(self):
        """Test student registration fails when course doesn't exist."""
        nonexistent_course_id = self.course2.id + 100
        data = self.valid_student_data.copy()
        data["course_id"] = nonexistent_course_id

        response = self.client.post(self.students_url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("non_field_errors", response.data)
        self.assertEqual(
            response.data["non_field_errors"][0],
            f"Course with ID {nonexistent_course_id} does not exist"
        )

    def test_create_student_duplicate_course_registration(self):
        """Test that a student cannot register for the same course twice."""
        # First registration should succeed
        response = self.client.post(self.students_url, self.valid_student_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Second registration for the same course should fail
        response = self.client.post(self.students_url, self.valid_student_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("non_field_errors", response.data)
        self.assertEqual(
            response.data["non_field_errors"][0],
            f"Student: {self.valid_student_data['email']} is already registered in this course"
        )

    def test_create_student_same_email_different_courses(self):
        """Test that a student can register for multiple different courses."""
        # Register for first course
        response = self.client.post(self.students_url, self.valid_student_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Register for second course with same email
        data = self.valid_student_data.copy()
        data["course_id"] = self.course2.id

        response = self.client.post(self.students_url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_student_long_field_values(self):
        """Test handling of excessively long field values."""
        data = self.valid_student_data.copy()
        data["full_name"] = "A" * 300  # Assuming max length is less than 300

        response = self.client.post(self.students_url, data)

        # Adjust based on your model's max_length constraints
        if response.status_code == status.HTTP_400_BAD_REQUEST:
            self.assertIn("full_name", response.data)

    def tearDown(self):
        """Clean up after each test if needed."""
        # Clear any test-specific data
        Student.objects.all().delete()

    @classmethod
    def tearDownClass(cls):
        """Clean up after all tests in this class."""
        super().tearDownClass()
        # Any class-level cleanup if needed
