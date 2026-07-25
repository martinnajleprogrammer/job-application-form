const ErrorMessage = ({ message }: { message: string }) => {

  if (!message) return null;
  return <span role="alert" className="error-message">{message}</span>
}
export default ErrorMessage;