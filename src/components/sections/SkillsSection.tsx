import { useContext, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import type { JobApplication } from "../../forms/jobApplication/schema";
import FormField, { FormFieldContext } from "../form/FormField";

const skillsPredefined = ['React', 'Node.js', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Python', 'Django', 'Flask', 'SQL', 'NoSQL', 'GraphQL', 'REST APIs', 'Git', 'Docker', 'Kubernetes'];

type CustomSkillInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const CustomSkillInput = ({ value, onChange, onKeyDown }: CustomSkillInputProps) => {
  const { name, hasError } = useContext(FormFieldContext);
  return (
    <input
      id={name}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      aria-invalid={hasError}
      aria-describedby={hasError ? `error-${name}` : undefined}
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
    <h2>My Skills:</h2>
    <p>
      {field.value?.length ? field.value.join(', ') : 'No skills added yet.'}
    </p>
    {skillsPredefined.map((skill) => {
      const isChecked = field.value?.includes(skill);
      const isDisabled = !isChecked && (field.value?.length ?? 0) >= 10;
      return <label key={skill}>
        <input
          type="checkbox"
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
    <FormField label="Other Skills" name="skills">
      <CustomSkillInput
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
      {duplicateError && <span>{duplicateError}</span>}
      {maximumError && <span>{maximumError}</span>}
    </FormField>
  </>
};
export default SkillsSection;