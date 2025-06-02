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
    } = useFormContext()

    const inputError = findInputError(errors, name)
    const isInvalid = isFormInvalid(inputError)

    const passwordValidation = name === 'password' ? {
        minLength: {
            value: 6,
            message: 'Min 6 characters',
        }
    } : {}

    const fixedValidation = {
        ...{
            required: {
                value: isRequired,
                message: 'Field is required.',
            }
        },
        ...passwordValidation
    }

    return (
        <div className={divClass || "mb-3"}>
            <AnimatePresence mode="wait" initial={false}>
                {isInvalid && (
                    <InputError
                        message={inputError.error.message}
                        key={inputError.error.message}
                    />
                )}
            </AnimatePresence>
            <Label label={label} id={id} isRequired={isRequired} />
            {/* check to show input or select tag*/}
            {title && options ?
                (
                    <select
                        id={id}
                        name={id}
                        className="form-select"
                        {...register(name, fixedValidation)}
                    >
                        <option value="" disabled selected>-- {title} --</option>
                        {
                            options.map(option => {
                                return <option key={option.value} value={option.option}>{option.option}</option>
                            })
                        }
                    </select>
                )
                :
                (
                    <input
                        type={type}
                        className={inputClass || "form-control"}
                        id={id}
                        name={name}
                        autoComplete={autoComplete}
                        placeholder={placeholder}
                        {...register(name, fixedValidation)}
                    />
                )
            }

        </div>
    )
}

Input.defaultProps = {
    title: null,
    option: null,
    autoComplete: "",
    placeholder: ""
}
