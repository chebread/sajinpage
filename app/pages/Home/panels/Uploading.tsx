import { useEffect } from 'react';
import { uploadFiles } from 'api';

const Uploading = ({ onCancel, file }) => {
  // (0): 업로딩중에 취소 기능 추가하기

  useEffect(() => {
    uploadFiles(file)
      .then(id => {
        setDocId(id);
      })
      .catch(error => {
        alert('파일 업로드중 오류 발생');
        setIsFile(false); // 아직 docId 저장 안되었기에 처음 화면으로 돌아감
      });
    console.log('파일을 업로드했습니다');
  }, []);

  return (
    <>
      <div>Uploading...</div>
      <button onClick={onCancel}>cancel uploading</button>
    </>
  );
};

export default Uploading;
