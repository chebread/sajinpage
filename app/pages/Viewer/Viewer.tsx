import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteFiles, loadFiles } from 'api';
import PageLoading from 'pages/PageLoading';
import ImagesViewer from './panels/ImagesViewer';
import stringToDate from 'lib/stringToDate';
import isExceedTimeLimit from 'lib/isExceedTimeLimit';
import getCurrentTime from 'lib/getCurrentTime';

// (0): 예시로 pdf 파일 띄워보기

const Viewer = () => {
  const params = useParams();
  const docId = params.id; // doc id
  const [fileDb, setFileDb] = useState({});
  const [isLoaded, setIsLoaded] = useState(false); // 파일 로드 유무
  const [error, setError]: any = useState(); // 파일 존재 유무

  const initValues = () => {
    setFileDb({});
    setIsLoaded(false);
    setError();
  };

  const loadFile = async () => {
    initValues(); // 재로딩을 위해 모든 값을 초기화하고 시작한다
    // file db 가져오기
    const fileDb = await loadFiles(docId);
    setFileDb(fileDb);
    // limit: true시 세션 종료 확인하기
    // string으로 저장된 data를 date 객체로 변환하기
    const limit = fileDb.limit;
    const currentTime = getCurrentTime();
    const timeLimit = stringToDate(fileDb.timeLimit);
    if (limit) {
      // file이 limit mode 일때
      const isSessionEnded = isExceedTimeLimit({
        currentTime: currentTime,
        endTime: timeLimit,
      });
      if (isSessionEnded) {
        // 세션 종료시
        // 파일을 삭제해 버리고 세션 종료 애러띄움 => 처음에 404 페이지는 세션 종료 에러이겠지만, 재접근시 그냥 없는 파일이라고만 뜸
        console.log('세션이 종료되었습니다');
        deleteFiles(docId);
        throw new Error('세션이 종료되어 파일 접근이 불가능합니다');
      }
      console.log('세션이 아직 유효합니다');
    }
    setIsLoaded(true); // 파일 로드됨
  };

  useEffect(() => {
    loadFile().catch(error => {
      // 404 에러 (파일 접근 불가) / 403 에러 (세션 종료) 뜸
      console.log(error);
      setError(true);
    });
  }, []);

  return error ? (
    // 2) 에러가 발생함
    // (0): errorElement 사용하여 해결하기
    // (0): error page를 동작시키기
    <>Error 발생</>
  ) : isLoaded ? (
    // 2) 파일이 로드됨
    <ImagesViewer db={fileDb} load={loadFile} />
  ) : (
    // 1) 로딩
    <PageLoading />
  );
};

export default Viewer;
