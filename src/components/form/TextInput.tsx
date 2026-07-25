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