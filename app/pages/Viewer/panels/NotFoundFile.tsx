import { useNavigate } from 'react-router-dom';

const NotFoundFile = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>파일이 존재하지 않음</div>
      <button onClick={() => navigate('/')}>Go home</button>
    </>
  );
};

export default NotFoundFile;
