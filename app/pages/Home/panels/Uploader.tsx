import styled from 'styled-components';
import { FullScreen } from 'layouts/Screens';
import { useRef } from 'react';
import Dropzone from 'react-dropzone';

// (*): 유한적 접근모드 추가 (1h만 사진 확인하고 세션이 끝나면 세션이 끝난 파일이라고 경고뜸)
// (*): 업로드시 사진 avif로 변경하는 기능

const Uploader = ({ onDrop }) => {
  const acceptTypes = useRef({
    'image/*': [], // 이미지 파일 전체를 받음
  });

  return (
    <Dropzone onDrop={onDrop} accept={acceptTypes.current} noClick>
      {({ getRootProps, getInputProps, open, isDragActive }) => (
        <>
          {/* file drag input */}
          <DropZone {...getRootProps()}>
            <input {...getInputProps()} />
            {/* user custom components */}
          </DropZone>
          <Button onClick={open}>Import images</Button>
        </>
      )}
    </Dropzone>
  );
};

const DropZone = styled(FullScreen)`
  position: absolute;
  z-index: 1;
`;

const Button = styled.button`
  position: absolute;
  z-index: 1;
`;

export default Uploader;
