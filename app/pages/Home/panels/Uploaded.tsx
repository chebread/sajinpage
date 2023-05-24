import { docIdAtom, initValuesAtom } from 'atoms';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';

// 업로드 완료시 모든 값을 초기화 해줌

// 업로드 완료

const Uploaded = () => {
  const [docId] = useAtom(docIdAtom);
  const localDocId = useRef(docId); // docId 초기화를 위해 미리 값을 컴포넌트 내부에 받아 둠
  const [, initValues] = useAtom(initValuesAtom);

  useEffect(() => {
    initValues(); // 값을 초기화하여 다시 홈에 갈것을 대비함
    // my files 접근을 위해 indexdb에 저장함
  }, []);

  return <Navigate to={`v/${localDocId.current}`} />;
};

export default Uploaded;
