import type { JobApplication } from "../../forms/jobApplication/schema";
import { useFieldArray, useFormContext } from "react-hook-form";
import FormField from "../form/FormField";
import TextInput from "../form/TextInput";

const ExperiencesSection = () => {
  const { control, register, setValue, clearErrors, watch } = useFormContext<JobApplication>();

  const { fields, append, remove } = useFieldArray<JobApplication, "experiences">({
    control,
    name: "experiences",
  });


  return (
    <div>
      <h2>Experiences</h2>
      {fields.map((experience, index) => {
        const { onChange: rhfOnChange, ...registerRest } = register(`experiences.${index}.currentlyWorking`);
        const currentlyWorking = watch(`experiences.${index}.currentlyWorking`);

        return (
          <div key={experience.id}>
            <h3>Experience {index + 1}</h3>
            <FormField label="Company Name" name={`experiences.${index}.companyName`}>
              <TextInput placeholder="Company Name" />
            </FormField>
            <FormField label="Role" name={`experiences.${index}.role`}>
              <TextInput placeholder="Role" />
            </FormField>
            <FormField label="Start Date" name={`experiences.${index}.startDate`}>
              <TextInput type="date" />
            </FormField>
            {!currentlyWorking && (
              <FormField label="End Date" name={`experiences.${index}.endDate`}>
                <TextInput type="date" />
              </FormField>
            )}
            <FormField label="Currently Working" name={`experiences.${index}.currentlyWorking`}>
              <input
                type="checkbox"
                {...registerRest}
                onChange={(e) => {
                  rhfOnChange(e); // RHF primero
                  if (e.target.checked) {
                    clearErrors(`experiences.${index}.endDate`);
                    setValue(`experiences.${index}.endDate`, undefined);
                  }
                }}
              />
            </FormField>
            <FormField label="Description" name={`experiences.${index}.description`}>
              <TextInput placeholder="Description" />
            </FormField>
            <button type="button" onClick={() => remove(index)}>
              Remove Experience
            </button>
          </div>
        );
      })}
      {/* Botón para agregar una nueva experiencia */}
      <button
        type="button"
        onClick={() =>
          append({
            companyName: "",
            role: "",
            startDate: new Date(),
            endDate: undefined,
            currentlyWorking: false,
            description: "",
          })
        }
      >
        Add Experience
      </button>
    </div>
  );
};
export default ExperiencesSection;