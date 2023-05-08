import styled from 'styled-components';
import { FullScreen } from 'layouts/Screens';
import { useRef, useState } from 'react';
import Dropzone from 'react-dropzone';

// (*): 제한 공유 모드 추가 - 파일 받고 중앙 모달로 공유 방식 선택하는 모달 뜸

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
