import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="py-5 mt-5">
            <div className="container text-center text-md-start">
                <div className="row">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h5 className="fw-bold">EduNext</h5>
                        <p>Empowering youth through modern,<br/>hands-on learning experiences.</p>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h6 className="fw-bold">Quick Links</h6>
                        <div className="footer-links">
                            <Link to="/about">About Us</Link>
                            <Link to="/courses">Courses</Link>
                            <Link to="/contact">Contact</Link>
                            <Link to="/privacy-policy">Privacy Policy</Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h6 className="fw-bold">Follow Us</h6>
                        <div className="footer-links">
                            <a href="https://facebook.com" target="_blank"><i className="fab fa-facebook"></i> Facebook</a>
                            <a href="https://instagram.com" target="_blank"><i
                                className="fab fa-instagram"></i> Instagram</a>
                            <a href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i> Twitter</a>
                        </div>
                    </div>
                </div>
                <div className="text-center pt-4">
                    <small className="text-muted">&copy; 2025 EduNext. All rights reserved.</small>
                </div>
            </div>
        </footer>
    )
}
