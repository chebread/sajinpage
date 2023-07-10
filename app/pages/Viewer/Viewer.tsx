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
import supabase from 'components/supabase';

const Viewer = () => {
  const [isRunningInterval, setIsRunningInterval] = useState(false); // useInterval을 중지하는 토글 =>  처음부터 false 해야지 subscribed 되고 나서 활성화할 수 있음
  const [error] = useAtom(errorAtom); // 이걸로 오류를 띄워 viewer라우트를 전환하게 함
  const [, onError] = useAtom(onErrorAtom);
  const params = useParams();
  const docId = params.id;
  const [fileDb, setFileDb] = useAtom(fileDbAtom);
  const [isLoaded, setIsLoaded] = useState(false); // 파일 로드 유무
  const [, initValues] = useAtom(initValuesAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // 여기서 발생되는 처리는 처음 접근시임!
    const onLoad = async () => {
      // run interval
      // setIsRunningInterval(true);
      // file db 가져오기
      const fileDb = await loadFiles(docId); // 최초 접근시 파일이 삭제되면 여기서 에러가 발생하게 됨
      setFileDb(fileDb);
      // 처음으로 check file excess 수행함 (excess가 true가 아닌 경우) => 이유가 image가 잠깐 노출되기 때문임
      const accessTime = fileDb.accessTime;
      const isFileExcess = await checkFileSessionByAccessTime(accessTime);
      if (isFileExcess) {
        endedSession();
      } else {
        // check file excess (이미 excess가 true인 경우)
        if (fileDb.excess) {
          // file excess
          onError({
            code: 403,
            message: '파일 세션 종료됨',
          });
          // kill interval
          // setIsRunningInterval(false);
        } else {
          // file is loaded
          setIsLoaded(true); // 여기서 값을 설정하더라도 useEffect 함수가 끝나야 반영됨
        }
      }
    };
    // subscribe as realtime
    const fetchChannel = fetchRealtimeFiles({
      tableId: 'refs',
      onUpdate: (payload: any) => {
        // file update
        console.log('파일의 정보가 업데이트됨'); // toast 안함
        setFileDb(payload.new);
        console.log(payload.new);
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
          // kill interval
          // setIsRunningInterval(false);
          console.log('파일이 존재하지 않음');
          onError({
            code: 404,
            message: '파일이 존재하지 않음',
          });
        });
      },
    });
    return () => {
      supabase.removeChannel(fetchChannel);
      console.log('unChannel');
      initValues(); // viewer 컴포넌트 끝날시에 값 초기화
    };
  }, []);
  // end file session
  const endedSession = async () => {
    // 세션 종료시 파일 삭제하지 않으며 doc의 excess: true로 하여 파일의 세션이 종료됨을 알려줌 삭제는 수동으로 진행해야함
    console.log('세션 종료');
    // (0): 세션 종료시 왜 image viewer가 실행되는지를 모르겠음 => 즉 excess시, not found file시에는 image viewer가 절대로 실행되면 안됨
    // kill interval
    setIsRunningInterval(false);
    await updateFiles({
      docId: fileDb.docId,
      excess: true, // 파일 세션 종료됨
    });
    onError({ code: 403, message: '파일 세션 종료됨' });
  };
  // check file session as realtime
  // 세션 초과되지 않았을때 && 에러가 나지 않을때 && limit mode 일때만 작동함
  useInterval(
    // (0): limit: true일때, excess = false일때, no error일때 running 하기
    // normal일때 (limit 변경 가능성 존재하여), limit 일때 (원래 작동해야하니) 작동하며
    // excess일때 404 일때는 아예 작동하지 않음
    async () => {
      console.log('running interval');
      if (!isEmptyObject(error) && fileDb.limit && !fileDb.excess) {
        const accessTime = fileDb.accessTime;
        const isFileExcess = await checkFileSessionByAccessTime(accessTime);
        if (isFileExcess) {
          endedSession();
          // kill interval
          setIsRunningInterval(false);
        }
      }
    },
    isRunningInterval && !isEmptyObject(error) && fileDb.limit && !fileDb.excess
      ? 1000
      : null
  ); // 1초마다 파일의 세션을 확인함

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
