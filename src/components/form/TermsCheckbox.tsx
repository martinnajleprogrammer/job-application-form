import { useFormContext } from "react-hook-form";

const TermsCheckbox = () => {
  const { register, formState: { errors } } = useFormContext();
  const hasError = !!errors.terms;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          {...register('terms')}
          aria-invalid={hasError}
          aria-describedby={hasError ? "error-terms" : undefined}
          className="h-4 w-4 rounded border-neutral-300 accent-primary-600 cursor-pointer"
        />
        <label htmlFor="terms" className="text-sm text-neutral-700 cursor-pointer">
          I agree to the terms and conditions
        </label>
      </div>
      {errors.terms && (
        <span id="error-terms" className="text-xs text-error-600">
          {String(errors.terms.message)}
        </span>
      )}
    </div>
  )
};
export default TermsCheckbox;