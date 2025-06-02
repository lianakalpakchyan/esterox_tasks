import React, { createContext, useEffect, useState } from 'react';

const CoursesContext = createContext();

const CoursesProvider = ({ children }) => {
    const [coursesState, setCoursesState] = useState({ loading: false, courses: null });

    useEffect(() => {
        setCoursesState({ loading: true, courses: null });
        const apiUrl = 'http://localhost:8000/courses/';
        fetch(apiUrl)
            .then(res => res.json())
            .then(courses => {
                setCoursesState({ loading: false, courses: courses });
            });
    }, []);

    return (
        <CoursesContext.Provider value={coursesState}>
            {children}
        </CoursesContext.Provider>
    );
};


export {CoursesContext, CoursesProvider}