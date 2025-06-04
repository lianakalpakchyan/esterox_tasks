import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Providers from './components/Providers.jsx';
import Loader from "./components/Loader.jsx";

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Courses = lazy(() => import('./pages/Courses.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const Students = lazy(() => import('./pages/Students.jsx'));
const NoPage = lazy(() => import('./pages/NoPage.jsx'));

function App() {
    return (
        <Providers>
            <Router>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/students" element={<Students />} />
                        <Route path="*" element={<NoPage />} />
                    </Routes>
                </Suspense>
            </Router>
        </Providers>
    );
}

export default App;
