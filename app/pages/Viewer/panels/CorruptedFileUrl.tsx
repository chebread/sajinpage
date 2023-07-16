import fileDbAtom from 'atoms/fileDbAtom';
import { errorAtom } from 'atoms/errorAtom';
import onDelete from 'components/Viewer/onDelete';
import { useAtom } from 'jotai';

// 예외로 url이 404일때
// public mode에서 오류가 발생하여 url이 이상한 것을 참조할때 에러 발생시 여기서 처리함 (GET https://jkbzservkrrjadofmhxj... 400 와 같은 image를 불러오고 출력할때 이런 오류가 발생시 여기서 처리함)
// 아니면 아예 모르는, 예기치 않은 오류가 발생할때 여기서 처리함 발생함

const CorruptedFileUrl = () => {
  const [error] = useAtom(errorAtom);
  const [fileDb] = useAtom(fileDbAtom);

  return (
    <>
      <h1>{error.code}</h1>
      <div>{error.message}</div>
      <div>
        <button onClick={() => onDelete(fileDb.docId)}>Delete</button>
      </div>
    </>
  );
};

export default CorruptedFileUrl;
