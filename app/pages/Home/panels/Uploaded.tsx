import { docIdAtom, initValuesAtom, urlAtom } from 'atoms';
import { set, get } from 'idb-keyval';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { onEventChannel } from 'lib/broadcastChannel';

// 업로드 완료시 모든 값을 초기화 해줌

// 업로드 완료

const Uploaded = () => {
  const [docId] = useAtom(docIdAtom);
  const [url] = useAtom(urlAtom);
  const localDocId = useRef(docId); // docId 초기화를 위해 미리 값을 컴포넌트 내부에 받아 둠
  const [, initValues] = useAtom(initValuesAtom);

  useEffect(() => {
    const onLoad = async () => {
      // add data in idb
      const urls = await get('urls');
      const notExistedUrls = urls === undefined;
      if (!notExistedUrls) {
        await set('urls', [...urls, docId]);
      } else {
        await set('urls', [docId]);
      }
      onEventChannel('add');
      initValues(); // 값을 초기화하여 다시 홈에 갈것을 대비함
    };
    onLoad().catch(error => {
      console.log(error);
    });
  }, []);

  return <Navigate to={`v/${localDocId.current}`} />;
};

export default Uploaded;
