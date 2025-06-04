import React, { createContext, useEffect, useState, useMemo } from 'react';
import { BACK_BASE_URL } from "../envKeys.jsx";

const CoursesContext = createContext();

const CoursesProvider = ({ children }) => {
    const [coursesState, setCoursesState] = useState({
        loading: true,
        courses: null,
        error: null,
    });

    useEffect(() => {
        const fetchCourses = async () => {
            setCoursesState({ loading: true, courses: null, error: null });
            const apiUrl = `${BACK_BASE_URL}courses/`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Failed to fetch courses');
                const courses = await response.json();
                setCoursesState({ loading: false, courses, error: null });
            } catch (error) {
                setCoursesState({ loading: false, courses: null, error: error.message });
            }
        };

        fetchCourses();
    }, []);

    const value = useMemo(() => coursesState, [coursesState]);

    return (
        <CoursesContext.Provider value={value}>
            {children}
        </CoursesContext.Provider>
    );
};

export { CoursesContext, CoursesProvider };
