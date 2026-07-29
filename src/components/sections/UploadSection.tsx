import { useFormContext } from "react-hook-form";
import FileUpload from "../form/FileUpload";
import type { JobApplication } from "../../forms/jobApplication/schema";
import { useEffect } from "react";
import useAutosave from "../../hooks/useAutoSave";

const UploadSection = () => {
  const { watch, register, setValue } = useFormContext<JobApplication>();
  const coverLetterValue = watch('coverLetter');
  const { status } = useAutosave({ key: 'coverLetter', value: coverLetterValue ?? '' });
  useEffect(() => {
    const saved = localStorage.getItem('coverLetter');
    if (saved) setValue('coverLetter', saved);
  }, []);
  return <>
    <h2> Upload Section:</h2 >
    <FileUpload name="resume" />
    <textarea {...register("coverLetter")} placeholder="Cover Letter" />
    <p>{`Number of chars: ${coverLetterValue?.length ?? 0}`}</p>
    <p>{`Autosave status: ${status}`}</p>
  </>;
}
export default UploadSection;
