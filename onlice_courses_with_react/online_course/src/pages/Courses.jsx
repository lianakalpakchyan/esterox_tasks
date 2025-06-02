import Layout from "../components/Layout.jsx";
import Placeholder from "../components/Placeholder.jsx";
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
                    <ul className="course-list">
                        {courses.map((course, index) => (
                            <li key={index}>{course.option}</li>
                        ))}
                    </ul>
                    : <h3>Loading...</h3>
                }
            </>
        </Layout>
    )
}
