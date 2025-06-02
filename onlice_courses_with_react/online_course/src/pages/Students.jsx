import Layout from "../components/Layout.jsx";
import {useEffect, useState} from "react";
import Student from "../components/Student.jsx";
import {Link} from "react-router-dom";
import {handleFetchStudentCourses} from "../api/student-courses.jsx";
import ReactPaginate from "react-paginate";

export default function Students() {
    const header = <h1>Our students!</h1>
    const [studentCourses, setStudentCourses] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 3;

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

    useEffect(() => {
        handleFetchStudentCourses(currentPage + 1, pageSize)
            .then(data => {
                setStudentCourses(data.results)
                setPageCount(Math.ceil(data.count / pageSize));
            });
    }, [currentPage]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <Layout header={header}>
            {studentCourses && studentCourses.length > 0 ?
                (
                    <div className="container py-5">
                        <div className="row g-4">
                            <Students currStudents={studentCourses} />
                        </div>
                        {pageCount > 1 &&
                            <div className="pagination">
                                <ReactPaginate
                                    breakLabel="..."
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={pageCount}
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    forcePage={currentPage}
                                    nextLabel="next >"
                                    previousLabel="< previous"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                        }
                    </div>
                ) :
                <h5>No students... <Link className="navbar-brand" to="/home">Become One!</Link></h5>
            }
        </Layout>
    )
}
