import { createContext } from "react";
import { useFormContext } from "react-hook-form";

type FormProps = {
  label: string;
  name: string;
  children: React.ReactNode;
};
export const FormFieldContext = createContext<{ name: string; hasError: boolean }>({ name: "", hasError: false });

const FormField = ({ label, name, children }: FormProps) => {
  const { formState: { errors } } = useFormContext();
  const error = name.split('.').reduce((acc: any, key) => acc?.[key], errors);
  const hasError = !!error;
  return (
    <FormFieldContext.Provider value={{ name, hasError }}>
      <div className="flex flex-col gap-1">
        <label className="font-sans text-s text-neutral-700 font-semibold" htmlFor={name}>{label}</label>
        {children}
        {hasError && <span className="font-sans text-xs text-error-600 font-semibold" id={`error-${name}`}>{String(error?.message)}</span>}
      </div>
    </FormFieldContext.Provider>
  );
};

export default FormField;