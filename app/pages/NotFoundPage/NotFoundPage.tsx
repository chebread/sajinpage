import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const onRedirect = () => {
    navigate('/');
  };

  return (
    <>
      <h1>404</h1>
      <div>Page is not found</div>
      <button onClick={onRedirect}>Go home</button>
    </>
  );
};

export default NotFoundPage;
