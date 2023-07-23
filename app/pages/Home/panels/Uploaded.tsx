import { docIdAtom } from 'atoms/filesAtom';
import initValuesAtom from 'atoms/initValuesAtom';
import { set, get } from 'idb-keyval';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { onEventChannel } from 'lib/broadcastChannel';

// 업로드 완료 (모든 값을 초기화 해줌)

const Uploaded = () => {
  const [docId] = useAtom(docIdAtom);
  const localDocId = useRef(docId); // docId 초기화를 위해 미리 값을 컴포넌트 내부에 받아 둠
  const [, initValues] = useAtom(initValuesAtom);

  useEffect(() => {
    const onLoad = async () => {
      // empty all atom datas
      initValues(); // 값을 초기화하여 다시 홈에 갈것을 대비함
    };
    onLoad().catch(error => {
      console.log(error);
    });
  }, []);

  return <Navigate to={`v/${localDocId.current}`} />;
};

export default Uploaded;
