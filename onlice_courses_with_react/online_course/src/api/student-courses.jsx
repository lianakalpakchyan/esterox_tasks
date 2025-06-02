const handleFetchStudentCourses = async (pageNumber, pageSize) => {
    const page = pageSize ? `&page_size=${pageSize}` : ''
    const pagination = pageNumber == null ? '' : `?page=${pageNumber}` + page
    const apiUrl = `http://localhost:8000/student_courses/${pagination}`;
    console.log(apiUrl)
    return fetch(apiUrl).then(res => res.json())
}


const handleCreateStudentCourse = async (newStudentCourse) => {
    try {
        const res = await fetch("http://localhost:8000/student_courses/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newStudentCourse),
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(`Error ${res.status}: ${JSON.stringify(errData)}`);
        }

        const data = await res.json();
        console.log("Student course created:", data);
        return true;
    } catch (err) {
        console.error("Error:", err.message);
        return false;
    }
};


export {handleFetchStudentCourses, handleCreateStudentCourse};
