import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import cancelUploadFiles from 'api/cancelUploadFiles';
import Uploading from './panels/Uploading';
import Uploader from './panels/Uploader';
import { uploadFiles } from 'api';
import { useAtom } from 'jotai';
import { docIdAtom, fileAtom, isFileAtom } from 'atoms';

// (*): alert 부분은 notify로 change 하기
// (*): 유한적 접근모드 추가 (1h만 사진 확인하고 세션이 끝나면 세션이 끝난 파일이라고 경고뜸)
// (0): 업로드는 uploading component 에서 수행함 (jotai로 통합하기)

const Home = () => {
  const [file, setFile] = useAtom(fileAtom);
  const [isFile, setIsFile] = useAtom(isFileAtom);
  const [docId, setDocId] = useAtom(docIdAtom);
  const [uploadMode, setUploadMode] = useState('');

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
    setIsFile(true); // (0): jotai 에러 막기
    setFile(file);
    //
    console.log('파일을 받았습니다');
  };
  const onClickCancle = async () => {
    // (0): 파일 업로드 취소 기능
    // await cancelUploadFiles(docId);
    setIsFile(false); // 처음 설정으로서 돌아옴
  };
  const onModeSelect = async (e: any) => {
    const {
      target: { value },
    } = e;
    setUploadMode(value);
    console.log('모드를 선택했습니다');
    // await uploadFiles(file)
    //   .then(id => {
    //     setDocId(id);
    //   })
    //   .catch(error => {
    //     alert('파일 업로드중 오류 발생');
    //     setIsFile(false); // 아직 docId 저장 안되었기에 처음 화면으로 돌아감
    //   });
    // console.log('파일을 업로드했습니다');
  };

  // (0): is error true시 useEffect 무한으로 되는 오류 발생 => setIsFile(false)로 해결함
  return !isFile ? (
    // 1) 입력된 파일이 없을때
    <Uploader onDrop={onDropFiles} />
  ) : // 파일이 입력됨
  docId === '' ? (
    uploadMode === '' ? (
      // 2) 모드 선택
      <div>
        <button onClick={onModeSelect} value="normal">
          Normal upload mode
        </button>
        <button onClick={onModeSelect} value="limit">
          Limit upload mode
        </button>
      </div>
    ) : (
      // 3) 업로딩중
      <Uploading onCancel={onClickCancle} file={file} />
    )
  ) : (
    // 4) 업로딩 완료
    <Navigate to={`v/${docId}`} />
  );
};

export default Home;
