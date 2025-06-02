import {CoursesProvider} from "../api/courses.jsx";

const Providers = ({ children }) => (
        <CoursesProvider>
            {children}
        </CoursesProvider>
);

export default Providers;
