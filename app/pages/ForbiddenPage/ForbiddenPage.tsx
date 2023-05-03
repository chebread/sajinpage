import ErrorPage from 'components/ErrorPage';

const ForbiddenPage = () => {
  const onClick = () => {
    const win = window as Window;
    win.location = 'microsoft-edge:' + window.location;
  };
  return <ErrorPage errorCode={503} onClick={onClick} />;
};

export default ForbiddenPage;
