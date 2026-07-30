import type { JobApplication } from "../../forms/jobApplication/schema";
import { useFieldArray, useFormContext } from "react-hook-form";
import FormField from "../form/FormField";
import TextInput from "../form/TextInput";
import SectionTitle from "../ui/SectionTitle";
import SectionDivider from "../ui/SectionDivider";

const ExperiencesSection = () => {
  const { control, register, setValue, clearErrors, watch } = useFormContext<JobApplication>();

  const { fields, append, remove } = useFieldArray<JobApplication, "experiences">({
    control,
    name: "experiences",
  });


  return (
    <div>
      <SectionTitle title="Experiences" />
      {fields.map((experience, index) => {
        const { onChange: rhfOnChange, ...registerRest } = register(`experiences.${index}.currentlyWorking`);
        const currentlyWorking = watch(`experiences.${index}.currentlyWorking`);

        return (
          <div key={experience.id} className="flex flex-col gap-4 p-4 border border-neutral-200 rounded-card mb-4">
            <p className="font-semibold text-neutral-700">Experience {index + 1}</p>
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
                className="h-4 w-4 appearance-none rounded border border-neutral-300 bg-white checked:border-primary-600 checked:bg-primary-600 accent-primary-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <button
              className="mt-2 flex ml-auto rounded-input border border-error-600 text-error-600 bg-error-50 px-4 py-2 hover:bg-error-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error-500"
              type="button"
              onClick={() => remove(index)}
            >
              Remove Experience
            </button>
          </div>
        );
      })}
      {/* Botón para agregar una nueva experiencia */}
      <button
        className="rounded-input border border-primary-600 text-primary-600 bg-primary-50 px-4 py-2 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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
      <SectionDivider />
    </div>
  );
};
export default ExperiencesSection;