import ErrorPage from 'components/ErrorPage';

const ForbiddenPage = () => {
  const onClickRedirect = () => {
    const win = window as Window;
    win.location = 'microsoft-edge:' + window.location;
  };
  return <ErrorPage errorCode={403} onClick={onClickRedirect} />;
};

export default ForbiddenPage;
