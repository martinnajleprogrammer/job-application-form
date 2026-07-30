import { useFormContext } from "react-hook-form";
import { FormFieldContext } from "./FormField";
import { useContext } from "react";

type SelectInputProps = {
  options: { value: string; label: string }[]
}
const SelectInput = ({ options }: SelectInputProps) => {
  const { name, hasError } = useContext(FormFieldContext)
  const { register } = useFormContext();
  return <select
    {...register(name)}
    id={name}
    aria-invalid={hasError}
    aria-describedby={hasError ? `error-${name}` : undefined}
    className={`w-full border rounded-input px-3 py-2 text-neutral-900 bg-white focus:outline-none focus:border-primary-500 focus:shadow-focus disabled:opacity-50 disabled:cursor-not-allowed
      ${hasError ? 'border-error-500 bg-error-50' : 'border-neutral-200'}`}
  >
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