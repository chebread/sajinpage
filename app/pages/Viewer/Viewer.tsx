import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFileUrl } from 'api';
import PageLoading from 'pages/PageLoading';
import ImagesViewer from './panels/ImagesViewer';
import NullFile from './panels/NullFile';

// (0): limit mode 세션 종료시 처리하는 것 추가
// (0): (아직은 구현하지 않음) time limit 에 현재시간에 종료시간을 빼어서 세션 유지 시간 기능 추가해야 함

const Viewer = () => {
  const params = useParams();
  const docId = params.id; // doc id
  const [fileUrl, setFileUrl] = useState(''); // file viewer url
  const [isLoaded, setIsLoaded] = useState(false); // 파일 로드 유무
  const [isNullFile, setIsNullFile] = useState(false); // 파일 존재 유무

  useEffect(() => {
    const onLoad = async () => {
      // file viewer url 가져오기
      const fileUrl = await getFileUrl(docId);
      setFileUrl(fileUrl);
      setIsLoaded(true); // 파일 로드됨
      // (*): file description 가져오기 => 있으면 출력 없으면 바로 create desc 하기
    };
    onLoad().catch(() => {
      setIsNullFile(true); // 파일이 존재하지 않음
    });
  }, []);

  return isNullFile ? (
    // 2) 파일이 없음
    <NullFile />
  ) : isLoaded ? (
    // 2) 파일이 로드됨
    <ImagesViewer src={fileUrl} docId={docId} />
  ) : (
    // 1) 로딩
    <PageLoading />
  );
};

export default Viewer;
