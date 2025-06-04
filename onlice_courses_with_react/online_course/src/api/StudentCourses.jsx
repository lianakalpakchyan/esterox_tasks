import { BACK_BASE_URL } from "../envKeys.jsx";

const handleFetchStudentCourses = async (pageNumber, pageSize) => {
    const url = new URL(`${BACK_BASE_URL}students/`);
    if (pageNumber != null) url.searchParams.append('page', pageNumber);
    if (pageSize != null) url.searchParams.append('page_size', pageSize);

    const res = await fetch(url.toString());

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(`Failed to fetch student courses: ${res.status} ${res.statusText} ${errorData ? JSON.stringify(errorData) : ''}`);
    }

    return res.json();
};


const handleCreateStudentCourse = async (newStudentCourse) => {
    const res = await fetch(`${BACK_BASE_URL}students/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudentCourse),
    });

    if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const error = errData ? JSON.stringify(errData) : res.statusText
        alert(`Failed to create student course: ${error}`);
        throw new Error(`Error ${res.status}: ${error}`);
    }

    return res.json();
};


export {handleFetchStudentCourses, handleCreateStudentCourse};