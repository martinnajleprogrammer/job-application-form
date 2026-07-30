import { useContext, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import type { JobApplication } from "../../forms/jobApplication/schema";
import FormField, { FormFieldContext } from "../form/FormField";
import SectionTitle from "../ui/SectionTitle";
import SectionDivider from "../ui/SectionDivider";

const skillsPredefined = ['React', 'Node.js', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Python', 'Django', 'Flask', 'SQL', 'NoSQL', 'GraphQL', 'REST APIs', 'Git', 'Docker', 'Kubernetes'];

type CustomSkillInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const CustomSkillInput = ({ value, onChange, onKeyDown, disabled }: CustomSkillInputProps) => {
  const { name, hasError } = useContext(FormFieldContext);
  return (
    <input
      className={`text-neutral-900 ${hasError ? "border-error-500 bg-error-50" : "border-neutral-200 bg-neutral-50"} rounded-input border focus:outline-none focus:border-primary-500 
      focus:shadow-focus w-full p-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      id={name}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      aria-invalid={hasError}
      aria-describedby={hasError ? `error-${name}` : undefined}
      disabled={disabled}
    />
  );
};

const SkillsSection = () => {
  const { trigger } = useFormContext<JobApplication>();
  const { field } = useController<JobApplication, 'skills'>({
    name: 'skills',
  })
  const [customSkill, setCustomSkill] = useState('')
  const [duplicateError, setDuplicateError] = useState('')
  const [maximumError, setMaximumError] = useState('')
  return <>
    <SectionTitle title="My Skills" />
    <div className="flex flex-wrap gap-2 mb-4">
      {skillsPredefined.map((skill) => {

        const isChecked = field.value?.includes(skill);
        const isDisabled = !isChecked && (field.value?.length ?? 0) >= 10;
        return <label
          key={skill}
          className={`cursor-pointer select-none rounded-pill px-3 py-1 text-sm border transition-colors
    ${isChecked
              ? 'border-primary-600 bg-primary-50 text-primary-600'
              : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'}
    ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          <input
            type="checkbox" className="sr-only"
            value={skill}
            checked={isChecked}
            disabled={isDisabled}
            onChange={(e) => {
              const newValue = e.target.checked
                ? [...(field.value || []), skill]
                : (field.value || []).filter((s) => s !== skill);
              field.onChange(newValue);
              trigger('skills');
            }}
          />
          {skill}
        </label>
      })}
      {field.value?.filter(s => !skillsPredefined.includes(s)).map(skill => (
        <span key={skill} className="flex items-center gap-1 rounded-pill px-3 py-1 text-sm border border-primary-600 bg-primary-50 text-primary-600">
          {skill}
          <button
            type="button"
            className="text-primary-400 hover:text-primary-700 leading-none"
            onClick={() => {
              field.onChange(field.value.filter(s => s !== skill));
              trigger('skills');
            }}
          >×</button>
        </span>
      ))}
    </div>
    <FormField label="Other Skills" name="skills">
      <CustomSkillInput
        disabled={field.value?.length >= 10}
        value={customSkill}
        onChange={(e) => {
          setCustomSkill(e.target.value)
          setDuplicateError('') // limpiar error al escribir
          setMaximumError('') // limpiar error al escribir
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            const trimmed = customSkill.trim()
            if (!trimmed) return
            if (field.value?.includes(trimmed)) {
              setDuplicateError('Skill already added')
              return
            }
            if (field.value?.length >= 10) {
              setMaximumError('No more skills can be added')
              return
            }
            field.onChange([...(field.value || []), trimmed])
            trigger('skills')

            setCustomSkill('')
          }
        }}
      />
      {duplicateError && <span className="text-xs text-error-600">{duplicateError}</span>}
      {maximumError && <span className="text-xs text-error-600">{maximumError}</span>}
    </FormField>
    <SectionDivider />
  </>
};
export default SkillsSection;