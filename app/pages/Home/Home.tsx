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

const Home = () => {
  const [, setFile] = useAtom(fileAtom);
  const [isFile, setIsFile] = useAtom(isFileAtom);
  const [docId, setDocId] = useAtom(docIdAtom);
  const [, setLimit] = useAtom(limitAtom);
  const [, setTimeLimit] = useAtom(timeLimitAtom);
  const [isSelected, setIsSelected] = useAtom(isSelectedAtom);

  const selectOptions: any = useRef([
    { value: 300, label: '5분' },
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
  };
  const onClickCancle = async () => {
    // (0): 파일 업로드 취소 기능
    // await cancelUploadFiles(docId);
    initAtoms(); // 처음 설정으로서 돌아옴
  };
  const onModeSelect = async (e: any) => {
    // (0): 안정적이게 e.target.value === normal 로서 로직을 구현하기
    const { value } = e;
    // normal upload mode = e.value가 undefined임 / limit upload mode = e.value 존재
    if (value) {
      // limit upload mode
      setTimeLimit(value);
      setLimit(true);
    }
    setIsSelected(true); // 선택됨
  };
  // 모든 전역 상태를 초기화하여 uploader로 갈 수 있게 하게끔 한다
  const initAtoms = () => {
    console.log('run');

    setFile('');
    setIsFile(false);
    setDocId('');
    setLimit(false);
    setTimeLimit(0);
    setIsSelected(false);
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
      <Uploading onCancel={onClickCancle} init={initAtoms} />
    )
  ) : (
    // 4) 업로딩 완료
    // => atoms를 모두 초기화하여 다시 / 올때 docId이 빈 값이 아닐때 redirect가 되지 않도록 함
    <Uploaded init={initAtoms} />
  );
};

export default Home;
