import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { get, set } from 'idb-keyval';
import { useNavigate } from 'react-router-dom';
import { eventChannel, onEventChannel } from 'lib/broadcastChannel';
import NotExistedBuckets from './panels/NotExistedBuckets';
import CopyToClipboard from 'react-copy-to-clipboard';
import getWebsiteUrl from 'lib/getWebsiteUrl';

// (0): 각각의 url 삭제할 수 있게 하기 (idb - del func)

const MyFiles = () => {
  const navigate = useNavigate();
  const [buckets, setBuckets] = useState<string[]>([]);

  useEffect(() => {
    const onLoad = async () => {
      set('urls', [1, 2, 3, 4, 5, 6]);
      // get datas in db
      const buckets: any = await get('urls');
      setBuckets(buckets);
      // track events
      eventChannel.addEventListener('message', onMessage); // BroadcastChannel 은 같은 라우트에서는 동작하지 않음. 같은 라우터는 이벤트 감지는 evented로 감지함 // 'message' 부분은 Broadcast channel api를 수신하는 방법임
      window.addEventListener('evented', onMessage); // 이것은 자체 del 사용시 필요함
      // track events 아래에서 onEventChannel을 해야 이벤트가 감지됨
      // test code
    };
    onLoad().catch(error => {
      console.log(error.url);
    });
    return () => {
      // eventChannel.close() 는 하면 오류발생 함
      eventChannel.removeEventListener('message', onMessage);
      window.removeEventListener('evented', onMessage);
    };
  }, []);

  const onMessage = async (e: any) => {
    const newBuckets: any = await get('urls');
    setBuckets(newBuckets);
    // test code //
    if (e.data != undefined) {
      console.log(e.data);
    } else {
      console.log(e.detail.data);
    }
  };
  const onDelete = async (value: string) => {
    const arr = [...buckets];
    const newArr = arr.filter(element => element !== value);
    await set('urls', newArr);
    onEventChannel('delete');
  };

  return (
    <Container>
      <h1>My files</h1>
      <div>
        {buckets != undefined ? (
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
                onCopy={() => {
                  // when copied
                }}
              >
                <button>Share</button>
              </CopyToClipboard>
              <button onClick={() => onDelete(value)}>Delete</button>
            </div>
          ))
        ) : (
          // buckets에 아무 값도 없을때 => 아무것도 없다고하는 라우터로 처리하기
          <NotExistedBuckets />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

export default MyFiles;
