import {useFormContext} from "react-hook-form";
import {Label} from "./Label.jsx";
import {findInputError} from "../../utils/findInputError.js";
import {isFormInvalid} from "../../utils/isFormInvalid.js";
import { AnimatePresence } from 'framer-motion'
import {InputError} from "./InputError.jsx";

export const Input = ({ id, name, label, type, placeholder, autoComplete, isRequired, title, options, inputClass, divClass }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const inputError = findInputError(errors, name);
    const isInvalid = isFormInvalid(inputError);

    const fixedValidation = {
        ...(isRequired && { required: { value: true, message: 'Field is required.' } }),
        ...(name === 'password' && { minLength: { value: 6, message: 'Min 6 characters' } }),
    };

    return (
        <div className={divClass || "mb-3"}>
            <AnimatePresence mode="wait" initial={false}>
                {isInvalid && (
                    <InputError
                        id={`${id}-error`}
                        message={inputError.error.message}
                        key={inputError.error.message}
                    />
                )}
            </AnimatePresence>
            <Label label={label} id={id} isRequired={isRequired} />
            {title && options ? (
                <select
                    id={id}
                    className="form-select"
                    aria-invalid={isInvalid}
                    aria-describedby={isInvalid ? `${id}-error` : undefined}
                    defaultValue=""
                    {...register(name, fixedValidation)}
                >
                    <option value="" disabled>-- {title} --</option>
                    {options.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    className={inputClass || "form-control"}
                    id={id}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    aria-invalid={isInvalid}
                    aria-describedby={isInvalid ? `${id}-error` : undefined}
                    {...register(name, fixedValidation)}
                />
            )}
        </div>
    );
};

Input.defaultProps = {
    title: null,
    options: null,
    autoComplete: "",
    placeholder: ""
};
