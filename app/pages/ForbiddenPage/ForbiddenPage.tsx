import ErrorPage from 'components/ErrorPage';

const ForbiddenPage = ({ errorCode, errorMessage }) => {
  const onClickRedirect = () => {
    if (errorCode === 'ie') {
      const win = window as Window;
      win.location = 'microsoft-edge:' + window.location;
    }
  };

  return (
    <ErrorPage
      errorCode={403}
      errorMessage={errorMessage}
      onClick={onClickRedirect}
    />
  );
};

export default ForbiddenPage;
