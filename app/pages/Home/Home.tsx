import cancelUploadFiles from 'api/cancelUploadFiles';
import Uploading from './panels/Uploading';
import Uploader from './panels/Uploader';
import { useAtom } from 'jotai';
import {
  docIdAtom,
  fileAtom,
  isFileAtom,
  isSelectedAtom,
  limitAtom,
  timeLimitAtom,
} from 'atoms';
import Uploaded from './panels/Uploaded';
import { useRef, useState } from 'react';
import Select from 'react-select';

// (*): alert 부분은 notify로 change 하기
// (*): 유한적 접근모드 추가 (1h만 사진 확인하고 세션이 끝나면 세션이 끝난 파일이라고 경고뜸)
// limit / normal 모드만 있으며 limit 값이 time도 내포하도록 설정

const Home = () => {
  const [file, setFile] = useAtom(fileAtom);
  const [isFile, setIsFile] = useAtom(isFileAtom);
  const [docId] = useAtom(docIdAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const [timeLimit, setTimeLimit] = useAtom(timeLimitAtom);
  const [isSelected, setIsSelected] = useAtom(isSelectedAtom);

  const selectOptions: any = useRef([
    { value: 10, label: '5분' },
    { value: 1800, label: '30분' },
    { value: 3600, label: '1시간' },
    { value: 86400, label: '1일' },
  ]);

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
    const { value } = e;
    if (value) {
      // limit upload mode
      console.log('limit mode!');
      console.log(value);
      setTimeLimit(value);
      setLimit(true);
    } else {
      // e.value가 undefined임
      console.log('normal mode!');
    }
    console.log('모드를 선택했습니다');
    setIsSelected(true); // 선택됨
  };

  return !isFile ? (
    // 1) 입력된 파일이 없을때
    <Uploader onDrop={onDropFiles} />
  ) : // 파일이 입력됨
  docId === '' ? (
    !isSelected ? (
      // 2) 모드 선택
      <div>
        <h1>Normal upload mode</h1>
        <button onClick={onModeSelect} value="normal">
          Normal upload mode
        </button>
        <h1>Limit upload mode</h1>
        <Select onChange={onModeSelect} options={selectOptions.current} />
      </div>
    ) : (
      // 3) 업로딩중 + 파일 업로드 및 로딩 같이 수행
      // => 파일 업로드중 오류 발생시 / 으로 가며, 아직 빈 값인 docId 빼고 모든 값들을 초기화 하여 / 으로 접속될 수 있도록 함
      <Uploading onCancel={onClickCancle} />
    )
  ) : (
    // 4) 업로딩 완료
    // => atoms를 모두 초기화하여 다시 / 올때 docId이 빈 값이 아닐때 redirect가 되지 않도록 함
    <Uploaded />
  );
};

export default Home;
