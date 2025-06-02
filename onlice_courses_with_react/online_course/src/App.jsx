import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Courses from './pages/Courses.jsx'
import Contact from './pages/Contact.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import NoPage from './pages/NoPage.jsx'
import About from "./pages/About.jsx";
import Students from "./pages/Students.jsx";
import Providers from "./components/Providers.jsx";


function App() {
    return (
        <>
            <Providers>
                <Router>
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
                </Router>
            </Providers>
        </>
  )
}

export default App
