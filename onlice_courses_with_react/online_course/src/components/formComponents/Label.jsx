export const Label = ({ label, id, isRequired, styleClass}) => {
    return (
        <label
            htmlFor={id}
            className={styleClass}>
            {/* this is dobe to receive an 'a' tag with pdf file as a tag not as a text */}
            <span dangerouslySetInnerHTML={{ __html: label }} /> { isRequired && <span className="text-danger">*</span> }
        </label>
    )
}


Label.defaultProps = {
    styleClass: "form-label"
}
