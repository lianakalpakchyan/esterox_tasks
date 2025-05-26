import Modal from "./Modal.jsx";
import {courseMap} from "../storage/courses.js";

export default function Student(props) {
    const { student } = props

    const courseFullName = courseMap[student.course]

    return (
        <div className="col-md-4">
            <Modal studentId={student.id}>
                <div className="modal-header">
                    <h5 className="modal-title">Student Details</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <ul className="list-unstyled">
                        <li><strong>Full Name:</strong> {student.name}</li>
                        <li><strong>Course:</strong> {courseFullName}</li>
                        <li><strong>Email:</strong> {student.email}</li>
                        <li><strong>Phone:</strong> {student.phone ? student.phone : "No data."}</li>
                        <li><strong>Referral:</strong> {student.referral ? student.referral : "No data."}</li>
                    </ul>
                </div>
            </Modal>
            <div className="card h-100" data-bs-toggle="modal" data-bs-target={"#studentModal" + student.id} style={{cursor: "pointer"}}>
                <div className="card-body text-center">
                    <h5 className="card-title">{student.name}</h5>
                    <p className="card-text text-muted">{courseFullName}</p>
                </div>
            </div>
        </div>
    )
}
