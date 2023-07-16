import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRealtimeFiles, loadFiles, updateFiles } from 'api';
import PageLoading from 'pages/PageLoading';
import ImagesViewer from './panels/ImagesViewer';
import { useAtom } from 'jotai';
import { errorAtom, fileDbAtom, initValuesAtom, onErrorAtom } from 'atoms';
import useInterval from 'hooks/useInterval';
import checkFileSessionByAccessTime from 'api/checkFileSessionByAccessTime';
import ViewerErrorPage from './panels/ViewerErrorPage';
import isEmptyObject from 'lib/isEmptyObject';
import supabase from 'lib/supabase';

// 파일들을 확인하는 곳으로 각각의 url들을 Bucket이라 칭함

const Viewer = () => {
  const [delay, setDalay] = useState(false);
  // useInterval을 중지하는 토글 => kill (false) or run (true) 두 상태를 가짐
  // 처음부터 false 해야지 subscribed 되고 나서 활성화할 수 있음
  const [error] = useAtom(errorAtom); // 이걸로 오류를 띄워 viewer 라우트를 전환하게 함
  const [, onError] = useAtom(onErrorAtom);
  const params = useParams();
  const docId = params.id;
  const [fileDb, setFileDb] = useAtom(fileDbAtom);
  const [isLoaded, setIsLoaded] = useState(false); // 파일 로드 유무
  const [, initValues] = useAtom(initValuesAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // 여기서 발생되는 처리는 처음 접근시임
    const onLoad = async () => {
      // file db 가져오기
      const fileDb = await loadFiles(docId); // 최초 접근시 파일이 삭제되면 여기서 에러가 발생하게 됨
      setFileDb(fileDb);
      const accessTime = fileDb.accessTime;
      const isFileExcess = await checkFileSessionByAccessTime(accessTime);
      // check file excess (excess가 true가 아닌 경우 => 처음으로 파일이 excess인지 확인하기)
      // excess된 image가 잠깐 노출되기 때문에 미리 load하기 전에 checking하여 잠깐 보이는 것을 방지함
      if (isFileExcess) {
        // file is excess
        await endedSession();
        // file은 load 안됬음
      } else {
        // check file excess (이미 file이 excess인 경우)
        if (fileDb.excess) {
          // file is already excess
          onError({
            code: 403,
            message: '파일 세션 종료됨',
          });
          // kill interval 하지 안아도 되는 이유는 이미 interval이 kill 상태임
        } else {
          // file이 excess 아닌 경우 && 404가 아닌 경우 => public or limit mode (아직 유효시간 남은)
          // file is loaded
          setIsLoaded(true); // 여기서 값을 설정하더라도 useEffect 함수가 끝나야 반영됨
          // first run interval
          setDalay(true); // if limit일때 setDalay 하지 않는 이유는 public에서 limit으로 전환되기 때문에 그냥 useInterval 내부에서 처리하는 것임
        }
      }
    };
    // subscribe as realtime
    const fetchRealtime = fetchRealtimeFiles({
      tableId: 'refs',
      onUpdate: (payload: any) => {
        // file update
        console.log('파일의 정보가 업데이트됨'); // toast 안함
        setFileDb(payload.new);
        // console.log(payload.new);
      },
      onDelete: (payload: any) => {
        // file deleted
        console.log('파일이 삭제됨');
        setFileDb(payload.new);
        initValues(); // 가기전에 초기화
        navigate('/'); // 라우트 안하고 홈으로 가기
      },
      onSubscribed: async () => {
        // realtime subscribed 후에 viewer를 실행함
        onLoad().catch(() => {
          // file not existed
          console.log('파일이 존재하지 않음');
          onError({
            code: 404,
            message: '파일이 존재하지 않음',
          });
          // kill interval 하지 않아도 되는 이유는 run interval 변경하기 전에 이미 404처리를 진행하게 됨
        });
      },
    });
    return () => {
      // viewer 컴포넌트 끝날시에 값 초기화 && Realtime channel을 unchannel함
      supabase.removeChannel(fetchRealtime);
      // console.log('unChannel');
      initValues();
    };
  }, []);

  // check file session as realtime each 1sec
  // 세션 초과되지 않았을때 && 에러가 나지 않을때 && limit mode 일때만 작동함
  useInterval(
    async () => {
      // console.log('running interval');
      if (!isEmptyObject(error) && fileDb.limit && !fileDb.excess) {
        const accessTime = fileDb.accessTime;
        const isFileExcess = await checkFileSessionByAccessTime(accessTime);
        if (isFileExcess) {
          endedSession();
          // console.log('killed interval');
          // kill interval
          setDalay(false); // 세션이 종료되었다는 것은 excess = true 라는 것이니, 이때는 interval이 다음돌때에 돌지 않아야되니 그냥 updateFiles를 믿어도 되지만, onUpdate는 subscribed가 정확하게 되지 않기에 kill를 해주어 안심하게 interval을 중지해야함
        }
      }
    },
    delay && !isEmptyObject(error) && fileDb.limit && !fileDb.excess
      ? 1000
      : null
  );
  const endedSession = async () => {
    // console.log('세션 종료');
    await updateFiles({
      docId: fileDb.docId,
      excess: true, // 파일 세션 종료됨
    });
    onError({ code: 403, message: '파일 세션 종료됨' });
  };

  return isEmptyObject(error) ? (
    // 2) 에러가 발생함
    <ViewerErrorPage errorCode={error.code} />
  ) : isLoaded ? (
    // 2) 파일이 로드됨
    <ImagesViewer />
  ) : (
    // 1) 로딩
    <PageLoading />
  );
};

export default Viewer;

// (0): limit: true일때, excess = false일때, no error일때 running 하기
// normal일때 (limit 변경 가능성 존재하여), limit 일때 (원래 작동해야하니) 작동하며
// excess일때 404 일때는 아예 작동하지 않음

// 세션 종료시 파일 삭제하지 않으며 doc의 excess: true로 하여 파일의 세션이 종료됨을 알려줌 삭제는 수동으로 진행해야함
