import Layout from "../components/Layout.jsx";
import {useContext} from "react";
import {CoursesContext} from "../api/courses.jsx";

export default function Courses() {
    const header = <h1>Our Courses!</h1>
    const { isLoading, courses } = useContext(CoursesContext);
    return (
        <Layout header={header}>
            <>
                {
                    !isLoading && courses ?
                        <ul className="course-list list-unstyled ps-2" style={{maxHeight: '55vh'}}>
                            {courses.map(course => (
                                <li key={course.id} className="mb-3">
                                    <h6 className="mb-1">{course.name}</h6>
                                    <p className="mb-1 text-muted" style={{ fontSize: "0.9rem" }}>{course.description}</p>
                                    <span className="badge bg-secondary">Duration: {course.duration} days</span>
                                </li>
                            ))}
                        </ul>
                    : <h3>Loading...</h3>
                }
            </>
        </Layout>
    )
}
