import React, { createContext, useEffect, useState } from 'react';
import {BACK_BASE_URL} from "../envKeys.jsx";

const CoursesContext = createContext();

const CoursesProvider = ({ children }) => {
    const [coursesState, setCoursesState] = useState({ loading: false, courses: null });

    useEffect(() => {
        setCoursesState({ loading: true, courses: null });
        const apiUrl = `${BACK_BASE_URL}courses/`;
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