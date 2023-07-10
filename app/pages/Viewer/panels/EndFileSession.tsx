import { fileDbAtom } from 'atoms';
import onDelete from 'components/Viewer/onDelete';
import { useAtom } from 'jotai';

// 파일 삭제할수 있는 버튼을 최대로 키우기
const EndFileSession = () => {
  const [fileDb] = useAtom(fileDbAtom);

  return (
    <>
      <div>403</div>
      <div>파일 세션이 종료됨</div>
      <div>
        <button onClick={() => onDelete(fileDb.docId)}>Delete</button>
      </div>
    </>
  );
};

export default EndFileSession;
