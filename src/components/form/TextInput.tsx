import { useContext } from "react"
import { useFormContext } from "react-hook-form"

import { FormFieldContext } from "./FormField"
type TextInputProps = {
  type?: string
  placeholder?: string
}

const TextInput = ({ type = "text", placeholder }: TextInputProps) => {
  const { name, hasError } = useContext(FormFieldContext)
  const { register } = useFormContext()

  return (
    <input
      className={`text-neutral-900 ${hasError ? "border-error-500 bg-error-50" : "border-neutral-200 bg-neutral-50"} rounded-input border focus:outline-none focus:border-primary-500 
      focus:shadow-focus w-full p-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      placeholder={placeholder}
      {...register(name)}
      id={name}
      aria-invalid={hasError}
      aria-describedby={hasError ? `error-${name}` : undefined}
      type={type}
    />
  )
}
export default TextInput;