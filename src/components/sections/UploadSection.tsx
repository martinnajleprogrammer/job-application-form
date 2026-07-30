import { useFormContext } from "react-hook-form";
import FileUpload from "../form/FileUpload";
import type { JobApplication } from "../../forms/jobApplication/schema";
import { useEffect } from "react";
import useAutosave from "../../hooks/useAutoSave";
import SectionTitle from "../ui/SectionTitle";
import SectionDivider from "../ui/SectionDivider";
import FormField from "../form/FormField";

const UploadSection = () => {
  const { watch, register, setValue } = useFormContext<JobApplication>();
  const coverLetterValue = watch('coverLetter');
  const { status } = useAutosave({ key: 'coverLetter', value: coverLetterValue ?? '' });
  useEffect(() => {
    const saved = localStorage.getItem('coverLetter');
    if (saved) setValue('coverLetter', saved);
  }, []);
  return <>
    <SectionTitle title="Resume & Cover Letter" />
    <FileUpload name="resume" />
    <FormField label="Cover Letter" name="coverLetter">
      <textarea
        {...register("coverLetter")}
        placeholder="Write your cover letter"
        rows={6}
        className="w-full border border-neutral-200 rounded-input px-3 py-2 text-neutral-900 bg-white focus:outline-none focus:border-primary-500 focus:shadow-focus resize-none"
      />
    </FormField>
    <div className="flex justify-between items-center mt-0.5">
      <span className={`text-xs ${status === 'saving' ? 'text-neutral-400' : status === 'saved' ? 'text-primary-600 font-semibold' : ''}`}>
        {status === 'saving' ? 'Saving...' : status === 'saved' ? 'Saved' : ''}
      </span>
      <span className="text-xs text-neutral-400">{coverLetterValue?.length ?? 0} / 1024</span>
    </div>
    <SectionDivider />
  </>;
}
export default UploadSection;
