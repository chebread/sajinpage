import { errorAtom } from 'atoms/errorAtom';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

// 예외로 file의 url이 404일때
// public mode에서 오류가 발생하여 url이 이상한 것을 참조할때 에러 발생시 여기서 처리함 (GET https://jkbzservkrrjadofmhxj... 400 와 같은 image를 불러오고 출력할때 이런 오류가 발생시 여기서 처리함)
// 아니면 아예 모르는, 예기치 않은 오류가 발생할때 여기서 처리함 발생함

const CorruptedFileUrl = () => {
  const [error] = useAtom(errorAtom);

  return (
    <>
      <h1>{error.code}</h1>
      <div>{error.message}</div>
    </>
  );
};

export default CorruptedFileUrl;
