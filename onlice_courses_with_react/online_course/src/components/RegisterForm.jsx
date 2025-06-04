import { FormProvider, useForm } from "react-hook-form";
import { Input } from "./formComponents/Input.jsx";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CoursesContext } from "../api/Courses.jsx";
import { handleCreateStudentCourse } from "../api/StudentCourses.jsx";

export default function RegisterForm() {
    const { isLoading, courses } = useContext(CoursesContext);
    const navigate = useNavigate();
    const methods = useForm();
    const [submitError, setSubmitError] = useState(null);

    const handleRegister = methods.handleSubmit(async (newStudent) => {
        try {
            setSubmitError(null);
            await handleCreateStudentCourse(newStudent);
            navigate('/students');
        } catch (error) {
            console.error(error);
            setSubmitError('Registration failed. Please try again.');
        }
    });

    const { formState: { isSubmitting } } = methods;

    return (
        <>
            {!isLoading && courses ? (
                <div className="card">
                    <div className="card-body p-4">
                        <h5 className="card-title mb-4 text-center">Register Now</h5>
                        <FormProvider {...methods}>
                            <form onSubmit={handleRegister} noValidate>
                                <Input
                                    label="Full Name"
                                    type="text"
                                    id="full_name"
                                    name="full_name"
                                    placeholder="e.g. Alex Mercer"
                                    autoComplete="name"
                                    isRequired={true}
                                />
                                <Input
                                    label="Email Address"
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@domain.com"
                                    autoComplete="email"
                                    isRequired={true}
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="********"
                                    autoComplete="current-password"
                                    isRequired={true}
                                />
                                <Input
                                    label="Phone Number"
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="+37499050505"
                                    autoComplete="tel"
                                    isRequired={false}
                                />
                                <Input
                                    label="Course"
                                    id="course_id"
                                    name="course_id"
                                    isRequired={true}
                                    title="Select course"
                                    options={courses}
                                />
                                <Input
                                    label="How did you hear about us?"
                                    type="text"
                                    id="referral"
                                    name="referral"
                                    placeholder="e.g. From a friend"
                                    autoComplete="on"
                                    isRequired={false}
                                />
                                <Input
                                    label="I agree to the <a href='documents/terms_and_conditions.pdf' download>Terms & Conditions</a>"
                                    type="checkbox"
                                    id="consent"
                                    name="consent"
                                    isRequired={true}
                                    inputClass="form-check-input"
                                    divClass="form-check mb-4"
                                />
                                {submitError && (
                                    <div className="alert alert-danger" role="alert">
                                        {submitError}
                                    </div>
                                )}
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-gradient btn-lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Registering..." : "🚀 Register Now"}
                                    </button>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            ) : (
                <h3>Loading ...</h3>
            )}
        </>
    );
}
