import ReactDom from 'react-dom'

export default function Modal(props){
    const { children, studentId } = props;
    return ReactDom.createPortal(
        <div className="modal fade" id={"studentModal" + studentId} tabIndex="-1" aria-labelledby="studentModalLabel1"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}
