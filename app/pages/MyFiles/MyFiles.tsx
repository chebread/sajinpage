import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { get } from 'idb-keyval';
import { useNavigate } from 'react-router-dom';
import { broadcastChannel, triggerEvent } from 'lib/broadcastChannel';
import NotExistedBuckets from './panels/NotExistedBuckets';
import CopyToClipboard from 'react-copy-to-clipboard';
import getWebsiteUrl from 'lib/getWebsiteUrl';
import onCopyBucket from 'components/MyFiles/onCopyBucket';
import { toast } from 'react-hot-toast';
import deleteIdb from 'lib/idb/deleteIdb';

// (0): buckets에 아무 값도 없을때 => 아무것도 없다고하는 라우터로 처리하기

const MyFiles = () => {
  const navigate = useNavigate();
  const [buckets, setBuckets] = useState<string[]>([]);

  useEffect(() => {
    const onLoad = async () => {
      // get datas in db
      const buckets: any = await get('urls');
      setBuckets(buckets);
      // track events
      broadcastChannel.addEventListener('message', onMessage); // BroadcastChannel 은 같은 라우트에서는 동작하지 않음. 같은 라우터는 이벤트 감지는 evented로 감지함 // 'message' 부분은 Broadcast channel api를 수신하는 방법임
      window.addEventListener('evented', onMessage); // 이것은 자체 del 사용시 필요함
      // track events 아래에서 triggerEvent을 해야 이벤트가 감지됨
      // test code
    };
    onLoad().catch(error => {
      console.log(error.url);
    });
    return () => {
      // broadcastChannel.close() 는 하면 오류발생 함
      broadcastChannel.removeEventListener('message', onMessage);
      window.removeEventListener('evented', onMessage);
    };
  }, []);

  const onMessage = async (e: any) => {
    // test code //
    if (e.data != undefined) {
      console.log(e.data);
      if (e.data === 'clear' || e.data === 'add') {
        const newBuckets: any = await get('urls');
        setBuckets(newBuckets);
      }
    } else {
      console.log(e.detail.data);
      if (e.detail.data === 'clear' || e.detail.data === 'add') {
        const newBuckets: any = await get('urls');
        setBuckets(newBuckets);
      }
    }
  };

  return (
    <Container>
      <h1>My files</h1>
      <div>
        {buckets != undefined && buckets.length != 0 ? (
          buckets.map((value: any, index: number) => (
            <div key={index}>
              <button
                onClick={() => {
                  navigate(`/v/${value}`);
                }}
              >
                {value}
              </button>
              <CopyToClipboard
                text={getWebsiteUrl(`/v/${value}`)}
                onCopy={onCopyBucket}
              >
                <button>Share</button>
              </CopyToClipboard>
              <button
                onClick={() => {
                  deleteIdb(buckets, value);
                  toast.success('Deleted');
                }}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <>
            <div>Buckets이 비어 있습니다.</div>
          </>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

export default MyFiles;
