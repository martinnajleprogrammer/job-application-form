import { useEffect, useState } from "react";
import useDebounce from "./useDebounce"

type AutosaveProps = {
  key: string;
  value: string;
}
const useAutosave = ({ key, value }: AutosaveProps) => {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const debouncedValue = useDebounce(value, 2000);
  useEffect(() => {
    if (debouncedValue) {
      localStorage.setItem(key, debouncedValue);
      setStatus("saved");
    }
  }, [key, debouncedValue]);
  useEffect(() => {
    setStatus("saving");
  }, [value]);
  return { status };
}
export default useAutosave;