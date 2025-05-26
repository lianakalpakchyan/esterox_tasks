import {FormProvider, useForm} from "react-hook-form";
import {Input} from "./formComponents/Input.jsx";
import {useEffect, useState} from "react";
import {hashPassword} from "../utils/passwordUtils.js";
import {useNavigate} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import {courses} from "../storage/courses.js";


export default function RegisterForm() {
    const navigate = useNavigate();
    const methods = useForm()
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('online-courses'));
        if (storedData?.students) {
            setStudents(storedData.students);
        }
    }, []);

    const handleHashPassword = async (student) => {
        student.password = await hashPassword(student.password);
        return student
    };

    const handleRegister = methods.handleSubmit(newStudent => {
        (async () => {
            try {
                if (newStudent.password) {
                    newStudent = await handleHashPassword(newStudent);
                }
                newStudent.id = uuidv4();
                const newStudentsList = [...students, newStudent];
                setStudents(newStudentsList);
                handleSaveData(newStudentsList);

                navigate('/students');
            } catch (error) {
                console.error(`Error happened while registering: ${error}`);
            }
        })();
    })

    function handleSaveData(currStudents) {
        localStorage.setItem('online-courses', JSON.stringify({students: currStudents}));
    }

    return (
        <div className="card">
            <div className="card-body p-4">
                <h5 className="card-title mb-4 text-center">Register Now</h5>
                <FormProvider {...methods}>
                    <form onSubmit={handleRegister} noValidate>
                        <Input label="Full Name" type="text" id="name" name="name" placeholder="e.g. Alex Mercer" autoComplete="name" isRequired={true} />
                        <Input label="Email Address" type="email" id="email" name="email" placeholder="you@domain.com" autoComplete="email" isRequired={true} />
                        <Input label="Password" type="password" id="password" name="password" placeholder="********" autoComplete="current-password" isRequired={true} />
                        <Input label="Phone Number" type="text" id="phone" name="phone" placeholder="+37499050505" autoComplete="tel" isRequired={false} />
                        <Input label="course" id="course" name="course" isRequired={true} title="Select course" options={courses} />
                        <Input label="How did you hear about us?" type="text" id="referral" name="referral" placeholder="e.g. From a friend" autoComplete="on" isRequired={false} />
                        <Input
                            label="I agree to the <a href='documents/terms_and_conditions.pdf' download>Terms & Conditions</a>"
                            type="checkbox" id="consent" name="consent" isRequired={true} inputClass="form-check-input" divClass="form-check mb-4" />
                        <div className="d-grid">
                            <button type="submit" className="btn btn-gradient btn-lg">🚀 Register Now</button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}
