const ErrorMessage = ({ message }: { message: string }) => {

  if (!message) return null;
  return <span role="alert" className="text-xs text-error-600">{message}</span>
}
export default ErrorMessage;