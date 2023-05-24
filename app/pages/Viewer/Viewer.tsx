import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteFiles, fetchRealtimeFiles, loadFiles } from 'api';
import PageLoading from 'pages/PageLoading';
import ImagesViewer from './panels/ImagesViewer';
import stringToDate from 'lib/stringToDate';
import isExceedTimeLimit from 'lib/isExceedTimeLimit';
import getCurrentTime from 'lib/getCurrentTime';
import { useAtom } from 'jotai';
import { fileDbAtom, initValuesAtom, isFileAtom } from 'atoms';
import useInterval from 'hooks/useInterval';

// (0): 예시로 pdf 파일 띄워보기

const Viewer = () => {
  const params = useParams();
  const docId = params.id;
  const [fileDb, setFileDb] = useAtom(fileDbAtom);
  const [isLoaded, setIsLoaded] = useState(false); // 파일 로드 유무
  const [error, setError]: any = useState(); // 파일 존재 유무 및 세션 유무 체크로 viewer를 중지시키는 역할을함
  const [, initValues] = useAtom(initValuesAtom);

  useEffect(() => {
    const onLoad = async () => {
      // file db 가져오기
      const fileDb = await loadFiles(docId); // 최초 접근시 파일이 삭제되면 여기서 에러가 발생하게 됨
      setFileDb(fileDb);
      // file is loaded
      setIsLoaded(true); // 여기서 값을 설정하더라도 함수가 끝나야 반영됨
      // 최초 접근시 파일의 세션을 확인함
      checkFileSession(fileDb);
      // fetch data as realtime
      fetchRealtimeFiles({
        tableId: 'refs',
        onUpdate: (payload: any) => {
          console.log('파일의 정보가 업데이트됨');
          setFileDb(payload.new);
        },
        onDelete: (payload: any) => {
          // 실시간으로 파일이 삭제됨을 감지 (실시간 o)
          // => 최초 접근시 세션이 종료되면 이 이벤트는 작동하지 않음
          console.log('파일이 삭제됨');
          setFileDb(payload.new);
          onError('파일이 삭제됨');
        },
      });
    };
    onLoad().catch(error => {
      // 최초 접근시 파일이 삭제되어 접근 불가 (실시간 x)
      console.log('파일이 존재하지 않음');
      onError('파일이 존재하지 않음'); // (0): onError 처리가 아닌 new Error 로 해볼까?
    });
    return () => {
      initValues(); // 컴포넌트 끝날시에 값 초기화
    };
  }, []);

  useInterval(() => {
    // 1초마다 파일의 세션 확인
    if (!error && fileDb.limit) {
      // 에러가 나지 않을때 && limit mode 일때만 작동함
      checkFileSession(fileDb);
    }
  }, 1000);

  const checkFileSession = (db: any) => {
    const currentTime = getCurrentTime();
    const timeLimit = stringToDate(db.timeLimit);
    // limit mode일때
    const isSessionEnded = isExceedTimeLimit({
      currentTime: currentTime,
      endTime: timeLimit,
    });
    if (isSessionEnded) {
      // 세션 종료시
      console.log('세션 종료');
      deleteFiles(docId);
      onError('세션이 종료됨');
    }
    // 세션이 유효함
  };

  const onError = (errorMessage: string) => {
    setError(errorMessage);
    initValues(); // 에러가 뜬다는 것은 파일의 데이터가 필요하지 않다는 것으로 파일의 데이터가 필요없기에 바로 버린다
  };

  return error ? (
    // 2) 에러가 발생함
    <>Error</>
  ) : isLoaded ? (
    // 2) 파일이 로드됨
    <ImagesViewer />
  ) : (
    // 1) 로딩
    <PageLoading />
  );
};

export default Viewer;
