import { useNavigate } from 'react-router-dom';
import ErrorPage from 'components/ErrorPage';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const onClickRedirect = () => {
    navigate('/');
  };
  return (
    <ErrorPage
      errorCode={404}
      errorMessage="Page is not found"
      onClick={onClickRedirect}
    />
  );
};

export default NotFoundPage;
