import { errorAtom } from 'atoms';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

const NotFoundFile = () => {
  const navigate = useNavigate();
  const [error] = useAtom(errorAtom);
  // 이렇게 atom을 불러와서 처리하는 이유는 imagesviewer에서 발생하는 404 코드는 같지만 다른 message를 가진 것 때문에 이렇게 처리를 해야지만, 에러를 사용자에게 올바르게 알릴 수 있음

  return (
    <>
      <h1>{error.code}</h1>
      <div>{error.message}</div>
      <button onClick={() => navigate('/')}>Go home</button>
    </>
  );
};

export default NotFoundFile;
