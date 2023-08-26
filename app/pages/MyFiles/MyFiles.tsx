import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { get } from 'idb-keyval';
import { useNavigate } from 'react-router-dom';
import { broadcastChannel } from 'lib/broadcastChannel';
import CopyToClipboard from 'react-copy-to-clipboard';
import getWebsiteUrl from 'lib/getWebsiteUrl';
import onDeleteBucket from 'components/MyFiles/onDeleteBucket';
import onCopyBucket from 'components/MyFiles/onCopyBucket';
import { landscapeVp } from 'layouts/properties';

// (0): buckets에 아무 값도 없을때 => 아무것도 없다고하는 라우터로 처리하기
// (0): broadcast도 같은 라우터에서 처리가능함 그래서 evented 없엠 => 일단 경과 지켜봐야할듯, 에러나면 바로 복귀함

const MyFiles = () => {
  const navigate = useNavigate();
  const [buckets, setBuckets] = useState<string[]>([]);

  useEffect(() => {
    const onLoad = async () => {
      // get datas in db
      const buckets: any = await get('urls');
      setBuckets(buckets);
      // track events
      broadcastChannel.addEventListener('message', onMessage);
      window.addEventListener('evented', onMessage);
    };
    onLoad().catch(error => {
      console.log(error.url);
    });
    return () => {
      broadcastChannel.removeEventListener('message', onMessage);
      window.removeEventListener('evented', onMessage);
    };
  }, []);

  const onMessage = async (e: any) => {
    if (e.data != undefined) {
      console.log(e.data);
      if (e.data === 'CLEAR' || e.data === 'INSERT') {
        const newBuckets: any = await get('urls');
        setBuckets(newBuckets);
      }
    } else {
      console.log(e.detail.data);
      if (e.detail.data === 'CLEAR' || e.detail.data === 'INSERT') {
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
              <button onClick={() => onDeleteBucket(buckets, value)}>
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
