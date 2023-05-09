import { useEffect } from 'react';
import { uploadFiles } from 'api';
import { useAtom } from 'jotai';
import { docIdAtom, fileAtom, isFileAtom } from 'atoms';

// (0): 업로딩중에 취소 기능 추가하기
// *(0): 업로드 후 back 이 안됨 (/ 으로 가는)
const Uploading = ({ onCancel, file, setDocId, setIsFile, setUploadMode }) => {
  useEffect(() => {
    const onLoad = async () => {
      // 파일 업로드
      await uploadFiles(file)
        .then(id => {
          console.log('파일을 업로드했습니다');
          setDocId(id);
        })
        .catch(error => {
          alert('파일 업로드중 오류 발생');
          setIsFile(false); // 아직 docId 저장 안되었기에 처음 화면으로 돌아감
          setUploadMode(''); // 처음화면으로 돌아가기 위해 기본값 초기화
        });
    };
    onLoad();
  }, []);

  return (
    <>
      <div>Uploading...</div>
      <button onClick={onCancel}>cancel uploading</button>
    </>
  );
};

export default Uploading;
