import { useFormContext } from "react-hook-form";
import { FormFieldContext } from "./FormField";
import { useContext } from "react";

type SelectInputProps = {
  options: { value: string; label: string }[]
}
const SelectInput = ({ options }: SelectInputProps) => {
  const { name, hasError } = useContext(FormFieldContext)
  const { register } = useFormContext();
  return <select {...register(name)} id={name} aria-invalid={hasError}
    aria-describedby={hasError ? `error-${name}` : undefined}>

    {options.length === 0
      ? <option value="">No options available</option>
      : <>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </>
    }
  </select>
}

export default SelectInput;