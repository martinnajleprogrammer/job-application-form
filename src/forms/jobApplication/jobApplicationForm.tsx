import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobApplicationSchema } from "./schema";
import TextInput from "../../components/form/TextInput";
import FormField from "../../components/form/FormField";

type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;
const JobApplicationForm = () => {
  const methods = useForm<JobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
    mode: "onBlur",
    defaultValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        linkedinURL: "",
        portfolioURL: "",
      },
      experiences: [],
      skills: [],
      resume: undefined,
      coverLetter: "",
      terms: false as unknown as true
    }
  });
  const { handleSubmit } = methods;
  const onSubmit = (data: JobApplicationFormData) => {
    console.log(data);
  };

  return <div className="p-8 bg-white shadow sm:rounded-lg sm:px-10">
    <h1 className="text-4xl text-slate-800 font-extrabold tracking-tigh">Job Application Form</h1>
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl text-slate-800 font-semibold tracking-tight">Personal Information</h2>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <FormField label="First Name" name="personalInfo.firstName">
            <TextInput placeholder="First Name" />
          </FormField>
          <FormField label="Last Name" name="personalInfo.lastName">
            <TextInput placeholder="Last Name" />
          </FormField>
          <FormField label="Email" name="personalInfo.email">
            <TextInput type="email" placeholder="Email" />
          </FormField>
          <FormField label="Phone" name="personalInfo.phone">
            <TextInput type="tel" placeholder="Phone" />
          </FormField>
          <FormField label="LinkedIn URL" name="personalInfo.linkedinURL">
            <TextInput type="url" placeholder="LinkedIn URL" />
          </FormField>
          <FormField label="Portfolio URL" name="personalInfo.portfolioURL">
            <TextInput type="url" placeholder="Portfolio URL" />
          </FormField>
        </div>
      </form>
    </FormProvider>

  </div>;
};
export default JobApplicationForm;