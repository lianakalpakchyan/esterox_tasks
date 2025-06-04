import {CoursesProvider} from "../api/Courses.jsx";

const Providers = ({ children }) => (
        <CoursesProvider>
            {children}
        </CoursesProvider>
);

export default Providers;
