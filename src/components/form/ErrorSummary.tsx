import React, { useEffect } from "react";

export type ErrorSummaryItem = { id: string; message: string };

const ErrorSummary = ({ errors }: { errors: ErrorSummaryItem[] }) => {
  const summaryRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors.length > 0 && summaryRef.current) {
      summaryRef.current.scrollIntoView({ behavior: "smooth" });
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.length]);

  if (errors.length === 0) return null;

  const focusField = (id: string) => {
    document.getElementById(id)?.focus();
  };

  return (
    <div
      ref={summaryRef}
      className="bg-error-50 border border-error-500 rounded-card p-4 focus:outline-none"
      role="alert"
      tabIndex={-1}
    >
      <h2 className="text-sm font-semibold text-error-700 mb-2">
        There are errors in your submission:
      </h2>
      <ul className="flex flex-col gap-1">
        {errors.map(({ id, message }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="text-sm text-error-600 underline hover:text-error-700"
              onClick={(e) => { e.preventDefault(); focusField(id); }}
            >
              {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ErrorSummary;
