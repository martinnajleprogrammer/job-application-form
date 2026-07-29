import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { checkEmail } from "../api";

const useAsyncValidation = (mail: string) => {

  const mailDebounced = useDebounce(mail, 500);
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    if (mailDebounced) {
      const validateEmail = async () => {
        try {
          setIsChecking(true);
          // const response = await fetch(`https://api.example.com/validate-email?email=${mailDebounced}`, { signal: controller.signal });
          const response = await checkEmail(mailDebounced);
          const isValid = await response.available;
          setIsAvailable(isValid);
          if (!isValid) {
            throw new Error("Email is already in use");
          }
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') return
          console.error(error)
        } finally {
          setIsChecking(false)
        }

      };
      validateEmail();
    }
    // cleanup:
    return () => controller.abort();
  }, [mailDebounced]);

  return { isChecking, isAvailable };
};

export default useAsyncValidation;