import Modal from "./Modal.jsx";
import {format} from "date-fns";

export default function Student(props) {
    const { student } = props

    return (
        <>
            <div className="col-md-4">
                <Modal studentId={student.id}>
                    <div className="modal-header">
                        <h5 className="modal-title">Student Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ul className="list-group" style={{listStyleType: 'none'}}>
                            <li><strong>Full Name:</strong> {student.full_name}</li>
                            <li><strong>Email:</strong> {student.email}</li>
                            <li><strong>Phone:</strong> {student.phone_number || "No data."}</li>
                            <li><strong>Referral:</strong> {student.referral || "No data."}</li>
                            <hr/>
                            <li>
                                <strong>Courses:</strong>
                                <ul className="mb-0 course-list list-unstyled ps-2 mr-1">
                                    {student.courses.map(course => (
                                        <>
                                            <li key={course.id}>
                                                {course.name}
                                                <span className="dateTime">Joined at: {format(new Date(course.created_at), 'MMMM d, yyyy h:mm a')}</span>
                                            </li>
                                        </>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </Modal>
                <div className="card h-100" data-bs-toggle="modal" data-bs-target={"#studentModal" + student.id} style={{cursor: "pointer"}}>
                    <div className="card-body text-center">
                        <h5 className="card-title">{student.full_name}</h5>
                        <span className="card-title">Involved in <b>{student.courses.length}</b> {student.courses.length === 1 ? 'course' : 'courses'}</span>
                    </div>
                </div>
            </div>
        </>

    )
}
