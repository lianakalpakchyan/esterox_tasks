import { MdError } from 'react-icons/md';


export const InputError = ({ message }) => {
    return (
        <p className="required-message">
            <MdError /> {message}
        </p>
    )
}
