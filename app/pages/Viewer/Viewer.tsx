import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteFiles, fetchRealtimeFiles, loadFiles } from 'api';
import PageLoading from 'pages/PageLoading';
import ImagesViewer from './panels/ImagesViewer';
import stringToDate from 'lib/stringToDate';
import isExceedTimeLimit from 'lib/isExceedTimeLimit';
import getCurrentTime from 'lib/getCurrentTime';
import { useAtom } from 'jotai';
import { fileDbAtom } from 'atoms';

// (0): 예시로 pdf 파일 띄워보기

const Viewer = () => {
  const params = useParams();
  const docId = params.id; // doc id
  const [, setFileDb] = useAtom(fileDbAtom);
  const [isLoaded, setIsLoaded] = useState(false); // 파일 로드 유무
  const [error, setError]: any = useState(); // 파일 존재 유무

  useEffect(() => {
    const onLoad = async () => {
      // file db 가져오기
      const fileDb = await loadFiles(docId);
      setFileDb(fileDb);
      // realtime
      fetchRealtimeFiles('refs', (payload: any) => {
        console.log('updated');
        setFileDb(payload.new);
      });
      // limit mode checking
      checkTimeLimit(fileDb);
      // file is loaded
      setIsLoaded(true);
    };
    onLoad().catch(error => {
      // (0): 파일 접근 불가 (404) or 세션 종료 (403) 처리하기
      console.log(error);
      setError(true);
    });
    return () => {
      initValues(); // 컴포넌트 끝날시에 값 초기화
    };
  }, []);

  const initValues = () => {
    setFileDb({});
  };
  const checkTimeLimit = (db: any) => {
    const limit = db.limit;
    const currentTime = getCurrentTime();
    const timeLimit = stringToDate(db.timeLimit);
    if (limit) {
      // limit mode
      const isSessionEnded = isExceedTimeLimit({
        currentTime: currentTime,
        endTime: timeLimit,
      });
      if (isSessionEnded) {
        // 세션 종료시
        // => 파일을 삭제해 버리고 세션 종료 애러띄움. 처음에 404 페이지는 세션 종료 에러이겠지만, 재접근시 그냥 없는 파일이라고만 뜸
        deleteFiles(docId);
        throw new Error('세션이 종료되어 파일 접근이 불가능합니다');
      }
      // 세션이 유효함
    }
  };

  return error ? (
    // 2) 에러가 발생함
    // (0): errorElement 사용하여 해결하기
    // (0): error page를 동작시키기
    <>Error 발생</>
  ) : isLoaded ? (
    // 2) 파일이 로드됨
    <ImagesViewer />
  ) : (
    // 1) 로딩
    <PageLoading />
  );
};

export default Viewer;
