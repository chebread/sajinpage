import {
  docIdAtom,
  fileAtom,
  isFileAtom,
  isSelectedAtom,
  limitAtom,
  timeLimitAtom,
} from 'atoms';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';

// 업로드 완료시 모든 값을 초기화 해줌
const Uploaded = () => {
  const [, setFile] = useAtom(fileAtom);
  const [, setIsFile] = useAtom(isFileAtom);
  const [docId, setDocId] = useAtom(docIdAtom);
  const [, setLimit] = useAtom(limitAtom);
  const [, setTimeLimit] = useAtom(timeLimitAtom);
  const [, setIsSelected] = useAtom(isSelectedAtom);
  const localDocId = useRef(docId); // docId 초기화를 위해 미리 값을 컴포넌트 내부에 받아 둠

  useEffect(() => {
    initAtoms(); // 값을 초기화함 => 다시 / 올것을 대비
    console.log('값 초기화');
  }, []);

  const initAtoms = () => {
    setFile('');
    setIsFile(false);
    setDocId('');
    setLimit(false);
    setTimeLimit(0);
    setIsSelected(false);
  };

  return <Navigate to={`v/${localDocId.current}`} />;
};

export default Uploaded;
