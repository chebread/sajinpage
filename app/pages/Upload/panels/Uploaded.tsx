import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { Navigate } from 'react-router-dom';
import filesAtom from 'atoms/filesAtom';
import initValuesAtom from 'atoms/initValuesAtom';
import { toast } from 'react-hot-toast';

// 업로드 완료 (모든 값을 초기화 해줌)

const Uploaded = () => {
  const [files] = useAtom(filesAtom);
  const localDocId = useRef(files.docId); // docId 초기화를 위해 미리 값을 컴포넌트 내부에 받아 둠
  const [, initValues] = useAtom(initValuesAtom);

  useEffect(() => {
    const onLoad = async () => {
      // empty all atom datas
      initValues(); // 값을 초기화하여 다시 홈에 갈것을 대비함
    };
    onLoad().catch(error => {
      console.error(error);
      toast.error('에러가 발생했습니다.');
    });
  }, []);

  return <Navigate to={`/v/${localDocId.current}`} />;
};

export default Uploaded;
