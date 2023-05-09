import { docIdAtom } from 'atoms';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';

// 업로드 완료시 모든 값을 초기화 해줌
const Uploaded = ({ init }) => {
  const [docId] = useAtom(docIdAtom);
  const localDocId = useRef(docId); // docId 초기화를 위해 미리 값을 컴포넌트 내부에 받아 둠

  useEffect(() => {
    init(); // 값을 초기화하여 다시 홈에 갈것을 대비함
  }, []);

  return <Navigate to={`v/${localDocId.current}`} />;
};

export default Uploaded;
