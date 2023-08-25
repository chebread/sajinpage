const ErrorPage = ({ errorCode, errorMessage, onClick }) => {
  return (
    <div>
      <div>{errorCode}</div>
      <div>{errorMessage}</div>
    </div>
  );
};

export default ErrorPage;
