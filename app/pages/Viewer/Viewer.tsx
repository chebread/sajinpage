import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRealtimeFiles, loadFiles, updateFiles } from 'api';
import PageLoading from 'pages/PageLoading';
import ImagesViewer from './panels/ImagesViewer';
import { useAtom } from 'jotai';
import { errorAtom, fileDbAtom, initValuesAtom, onErrorAtom } from 'atoms';
import useInterval from 'hooks/useInterval';
import checkFileSession from 'api/checkFiledSession';
import ViewerErrorPage from './panels/ViewerErrorPage';
import isEmptyObject from 'lib/isEmptyObject';
import supabase from 'components/supabase';

const Viewer = () => {
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
      // file db 가져오기
      const fileDb = await loadFiles(docId); // 최초 접근시 파일이 삭제되면 여기서 에러가 발생하게 됨
      setFileDb(fileDb);
      // file is loaded
      setIsLoaded(true); // 여기서 값을 설정하더라도 useEffect 함수가 끝나야 반영됨
      // check file excess
      // 처음 파일 세션 확인은 image viewer 에서 수행함
      if (fileDb.excess) {
        // file excess
        onError({
          code: 403,
          message: '파일 세션 종료됨',
        });
      }
      // fetch data and as realtime
    };
    // subscribe as realtime
    const fetchChannel = fetchRealtimeFiles({
      tableId: 'refs',
      onUpdate: (payload: any) => {
        // file update
        console.log('파일의 정보가 업데이트됨'); // toast 안함
        setFileDb(payload.new);
      },
      onDelete: (payload: any) => {
        // file deleted
        console.log('파일이 삭제됨');
        setFileDb(payload.new);
        initValues(); // 가기전에 초기화
        navigate('/'); // 라우트 안하고 홈으로 가기
      },
      onSubscribed: () => {
        // realtime subscribed 후에 viewer를 실행함
        onLoad().catch(() => {
          // file not existed
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
    updateFiles({
      docId: fileDb.docId,
      excess: true, // 파일 세션 종료됨
    });
    onError({ code: 403, message: '파일 세션 종료됨' });
  };
  // check file session as realtime
  // 세션 초과되지 않았을때 && 에러가 나지 않을때 && limit mode 일때만 작동함
  useInterval(async () => {
    if (!isEmptyObject(error) && fileDb.limit && fileDb.excess != true) {
      const url = fileDb.url;
      await checkFileSession(url, endedSession);
    }
  }, 1000); // 1초마다 파일의 세션을 확인함

  return isEmptyObject(error) ? (
    // 2) 에러가 발생함
    <ViewerErrorPage errorCode={error.code} />
  ) : isLoaded ? (
    // 2) 파일이 로드됨
    <ImagesViewer endedSession={endedSession} />
  ) : (
    // 1) 로딩
    <PageLoading />
  );
};

export default Viewer;
