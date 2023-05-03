import { useNavigate } from 'react-router-dom';
import ErrorPage from 'components/ErrorPage';

const ServiceUnavailable = () => {
  const navigate = useNavigate();
  const onClickRedirect = () => {
    navigate('/');
  };
  return <ErrorPage errorCode={503} onClick={onClickRedirect} />;
};

export default ServiceUnavailable;
