import Layout from "../components/Layout.jsx";
import {useEffect, useState} from "react";
import Student from "../components/Student.jsx";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function Students({ studentsPerPage }) {
    const header = <h1>Our students!</h1>
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if ( !localStorage || !localStorage.getItem('online-courses') ) { return }
        let db = JSON.parse(localStorage.getItem('online-courses'))
        setStudents(db.students);
    }, [])

    const [studentOffset, setStudentOffset] = useState(0);

    function Students ({ currStudents }) {
        return (
            <>
                {currStudents.map(student => {
                    return (
                        <Student key={student.id} student={student}/>
                    )
                })}
            </>
        );
    }

    const endOffset = studentOffset + studentsPerPage;
    const currStudents = students.slice(studentOffset, endOffset);
    const pageCount = Math.ceil(students.length / studentsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * studentsPerPage) % students.length;
        setStudentOffset(newOffset);
    };

    return (
        <Layout header={header}>
            {students.length > 0 ? (
                <div className="container py-5">
                    <div className="row g-4">
                        <Students currStudents={currStudents} />
                    </div>
                    {students.length > studentsPerPage &&
                        <div className="pagination">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>
            ) : <h5>No students... <Link className="navbar-brand" to="/home">Become One!</Link></h5>}
        </Layout>
    )
}
