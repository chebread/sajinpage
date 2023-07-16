import { errorAtom, fileDbAtom } from 'atoms';
import onDelete from 'components/Viewer/onDelete';
import { useAtom } from 'jotai';

// 파일 삭제할수 있는 버튼을 최대로 키우기
const EndFileSession = () => {
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

export default EndFileSession;
