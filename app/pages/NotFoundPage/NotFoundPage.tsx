import { useNavigate } from 'react-router-dom';
import ErrorPage from 'components/ErrorPage';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/');
  };
  return <ErrorPage errorCode={404} onClick={onClick} />;
};

export default NotFoundPage;
