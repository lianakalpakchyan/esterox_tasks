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
                        <ul className="list-unstyled">
                            <li><strong>Full Name:</strong> {student.full_name}</li>
                            <li><strong>Course:</strong> {student.course}</li>
                            <li><strong>Email:</strong> {student.email}</li>
                            <li><strong>Phone:</strong> {student.phone_number ? student.phone_number : "No data."}</li>
                            <li><strong>Referral:</strong> {student.referral ? student.referral : "No data."}</li>
                        </ul>
                        <span className="dateTime">Created at: {format(new Date(student.created_at), 'MMMM d, yyyy h:mm a')}</span>
                    </div>
                </Modal>
                <div className="card h-100" data-bs-toggle="modal" data-bs-target={"#studentModal" + student.id} style={{cursor: "pointer"}}>
                    <div className="card-body text-center">
                        <h5 className="card-title">{student.full_name}</h5>
                        <p className="card-text text-muted">{student.course}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
