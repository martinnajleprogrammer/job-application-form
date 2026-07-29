import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobApplicationSchema, type JobApplication, type JobApplicationOutput } from "./schema";
import ExperiencesSection from "../../components/sections/ExperiencesSection";
import SkillsSection from "../../components/sections/SkillsSection";
import UploadSection from "../../components/sections/UploadSection";
import PersonalInfoSection from "../../components/sections/PersonalInfoSection";
import { submitApplication } from "../../api";

const JobApplicationForm = () => {
  const methods = useForm<JobApplication, unknown, JobApplicationOutput>({
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
  const { register, setError, handleSubmit, formState: { isSubmitting, errors } } = methods;
  const onSubmit = async (data: JobApplicationOutput) => {
    console.log("Form submitted:", data);
    try {
      await submitApplication(data);
    }
    catch (error) {
      if (error instanceof Error && error.message === '500') {
        setError('root', { message: 'Network error, try again' })
      } else {
        setError('root', { message: 'Server error' })
      }
    }
  };

  return <div className="p-8 bg-white shadow sm:rounded-lg sm:px-10">
    <h1 className="text-4xl text-slate-800 font-extrabold tracking-tigh">Job Application Form</h1>
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {isSubmitting && <p>Displaying spinner....</p>}
        {!isSubmitting && (<><PersonalInfoSection /><ExperiencesSection /><SkillsSection /><UploadSection /></>
        )}
        <div>
          <input type="checkbox" id="terms" {...register('terms')} />
          <label htmlFor="terms">I agree to the terms and conditions</label>
          {errors.terms && <span>{errors.terms.message}</span>}
        </div>
        <button type="submit" disabled={isSubmitting}>Submit</button>
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
      </form>
    </FormProvider>

  </div>;
};
export default JobApplicationForm;

