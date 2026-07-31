import { FormProvider, useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobApplicationSchema, type JobApplication, type JobApplicationOutput } from "./schema";
import ExperiencesSection from "../../components/sections/ExperiencesSection";
import SkillsSection from "../../components/sections/SkillsSection";
import UploadSection from "../../components/sections/UploadSection";
import PersonalInfoSection from "../../components/sections/PersonalInfoSection";
import { submitApplication } from "../../api";
import usePreventNavigation from "../../hooks/usePreventNavigation";
import { useEffect, useRef } from "react";
import Spinner from "../../components/ui/Spinner";
import TermsCheckbox from "../../components/form/TermsCheckbox";
import ErrorSummary from "../../components/form/ErrorSummary";

export const sectionTitle = "text-2xl text-neutral-800 font-semibold tracking-tight mb-2";

const flattenErrors = (errors: FieldErrors, prefix = ""): { id: string; message: string }[] =>
  Object.entries(errors).flatMap(([key, value]) => {
    if (!value) return [];
    const id = prefix ? `${prefix}.${key}` : key;
    if (typeof value.message === "string") {
      return [{ id, message: value.message }];
    }
    return flattenErrors(value as FieldErrors, id);
  });

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
  const { reset, setError, handleSubmit, formState: { isSubmitting, isSubmitted, errors, isDirty } } = methods;
  usePreventNavigation(isDirty);

  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (isDirty && !startTime.current) {
      startTime.current = Date.now();
    }
  }, [isDirty]);


  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      console.log('Submit errors:', Object.keys(errors));
    }
  }, [errors, isSubmitted]);


  const onSubmit = async (data: JobApplicationOutput) => {
    console.log("Form submitted:", data);
    try {
      await submitApplication(data);
      console.log(`Form submitted successfully in ${Date.now() - (startTime.current ?? Date.now())} ms`);
      reset();
    }
    catch (error) {
      if (error instanceof Error && error.message === '500') {
        setError('root', { message: 'Network error, try again' })
      } else {
        setError('root', { message: 'Server error' })
      }
    }
  };


  return (
    <div className="min-h-screen bg-neutral-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-card shadow-card p-8">
        <h1 className="text-3xl text-neutral-900 font-semibold tracking-tight mb-8">Job Application</h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {isSubmitted && <ErrorSummary errors={flattenErrors(errors)} />}
            <PersonalInfoSection />
            <ExperiencesSection />
            <SkillsSection />
            <UploadSection />
            <TermsCheckbox />
            {errors.root && (
              <p className="text-sm text-error-600 bg-error-50 border border-error-500 rounded-input px-3 py-2">
                {errors.root.message}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-input transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <><Spinner /> Submitting...</> : 'Submit Application'}
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
export default JobApplicationForm;

