import { RelativePos } from 'layouts/properties';
import { FullScreen } from 'layouts/screens';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { get } from 'idb-keyval';
import { useNavigate } from 'react-router-dom';
import { eventChannel, onEventChannel } from 'lib/broadcastChannel';
import NotExistedBuckets from './panels/NotExistedBuckets';

// (0): 내가 업로드하면 그 파일의 docId를 Local storage에 차근차근 업로드될때마다 저장하여 홈에서 내가 만들 파일 (/f) 에서 local storage를 불러와서 파일들을
// => 접근할 수 있도록 함. limit 이라면 local storage에도 limit이라고 저장되며 자물쇠 표시가 파일 옆에 떠 있음
// (0): doc id 만 저장하며 a tag로 map 하여 /v/(docid) 로 맵핑 해준다
// (0): local storage에 아무런 doc id가 없으면 파일이 없습니다 뜨게 하기
// (0): => null files를 쓰지만 error message를 달리하기 (고려)

// (0): 모든 값 가져오고 모든 값중 변경되는 것을 읽는다
// 변경: local storage가 아닌 indexeddb를 사용하며 안되는 브라우저는 접근 막기

// storage의 key는 임의의 uid, value도 docId로 한다. 라이브러리는 localForage 사용하기

// (0): db를 실시간으로 즉각 반응하기 (with observer) => completed
// (0): 각각의 url 삭제할 수 있게 하기 (idb - del func)
// (0): dispatch event를 사용하여 같은 라우터에서 event 처리할 수 있도록 하기! (addeventlistener 추가해야함)

const MyFiles = () => {
  const navigate = useNavigate();
  const [buckets, setBuckets] = useState<string[]>([]);
  // const localEventChannel = new BroadcastChannel('localChannel');

  useEffect(() => {
    const onLoad = async () => {
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
      eventChannel.close();
      window.removeEventListener('evented', onMessage);
    };
  }, []);

  const onMessage = async (e: any) => {
    const newBuckets: any = await get('urls');
    setBuckets(newBuckets);
    // test code
    if (e.data != undefined) {
      console.log(e.data);
    } else {
      console.log(e.detail.data);
    }
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
            </div>
          ))
        ) : (
          // buckets에 아무 값도 없을때 => 아무것도 없다고하는 라우터로 처리하기
          <NotExistedBuckets />
        )}
      </div>
      <button onClick={() => onEventChannel('hello')}>hello</button>
    </Container>
  );
};

const Container = styled(FullScreen)`
  ${RelativePos}
`;

export default MyFiles;
