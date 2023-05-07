import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { uploadFiles } from 'api';
import cancelUploadFiles from 'api/cancelUploadFiles';
import Uploading from './panels/Uploading';
import Uploader from './panels/Uploader';

// (0): alert 부분은 notify로 change 하기
const Home = () => {
  const [isFile, setIsFile] = useState(false);
  const [isError, setIsError] = useState(false);
  const [docId, setDocId] = useState('');

  const onDropFiles = async (files: any) => {
    if (files.length > 1) {
      // 1개 초과 파일은 받지 않음
      alert('한 개의 파일만 업로드 가능');
      return;
    }
    const file = files[0];
    if (file === undefined) {
      // 이미지 파일 이외의 파일은 받지 않음
      alert('이 파일 형식은 업로드 될 수 없음');
      return;
    }
    setIsFile(true);
    // upload file
    await uploadFiles(file)
      .then(id => {
        console.log(id);
        setDocId(id);
      })
      .catch(() => {
        alert('업로드중 오류 발생');
        setIsError(true);
      });
  };
  const onClickCancle = async () => {
    // (0): 파일 업로드 취소 기능
    // await cancelUploadFiles(docId);
    setIsFile(false); // 처음 설정으로서 돌아옴
  };

  return !isFile ? (
    // 1) 입력된 파일이 없을때
    <Uploader onDrop={onDropFiles} />
  ) : // 파일이 입력됨
  docId === '' ? (
    // 로드 되지 않음
    !isError ? (
      // 2) 업로딩중
      <Uploading onCancel={onClickCancle} />
    ) : (
      // 3) 업로딩중 에러발생시
      <Navigate to="/" />
    )
  ) : (
    // 3) 업로딩 완료
    <Navigate to={`v/${docId}`} />
  );
};

export default Home;
