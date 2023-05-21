import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadFiles } from 'api';
import PageLoading from 'pages/PageLoading';
import ImagesViewer from './panels/ImagesViewer';

// (0): (아직은 구현하지 않음) time limit 에 현재시간에 종료시간을 빼어서 세션 유지 시간 통보 기능 추가해야 함

// (0): 여기에서 time limit을 가져와야함 time limit checking logic을 구현해야함 => 여기에서 체킹하는 이유는 파일이 존재 유무와 흡사하기 때문임

const Viewer = () => {
  const params = useParams();
  const docId = params.id; // doc id
  const [fileUrl, setFileUrl] = useState(''); // file viewer url
  const [isLoaded, setIsLoaded] = useState(false); // 파일 로드 유무
  const [isError, setIsError] = useState(false); // 파일 존재 유무

  useEffect(() => {
    const onLoad = async () => {
      // file db 가져오기
      const db = await loadFiles(docId);
      // file viewer url 가져오기
      const fileUrl = db.url;
      setFileUrl(fileUrl);
      // file limit options 가져오기
      setIsLoaded(true); // 파일 로드됨
    };
    onLoad().catch(error => {
      setIsError(true);
      // 404 에러 발생만 함
    });
  }, []);

  return isError ? (
    // 2) 에러가 발생함
    // (0): errorElement 사용하여 해결하기
    <>Error 발생</>
  ) : isLoaded ? (
    // 2) 파일이 로드됨
    <ImagesViewer src={fileUrl} docId={docId} />
  ) : (
    // 1) 로딩
    <PageLoading />
  );
};

export default Viewer;
