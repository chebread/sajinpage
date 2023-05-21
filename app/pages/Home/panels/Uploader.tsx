import styled from 'styled-components';
import { FullScreen } from 'layouts/Screens';
import { useEffect, useRef } from 'react';
import Dropzone from 'react-dropzone';
import { fileAtom, isFileAtom } from 'atoms';
import { useAtom } from 'jotai';
import { AbsolutePos, RelativePos } from 'layouts/properties';

// (0): (Style) 제한 공유 모드 추가 - 파일 받고 중앙 모달로 공유 방식 선택하는 모달 뜸
// (0): 간략한 도움말 만들기
// (0): alert 부분은 notify로 change 하기

// 파일을 사용자로부터 받아오는 부분

const Uploader = () => {
  const [, setFile] = useAtom(fileAtom);
  const [, setIsFile] = useAtom(isFileAtom);
  const acceptTypes = useRef({
    'image/*': [], // 이미지 파일 전체를 받음
  });

  const onPaste = (e: any) => {
    const {
      clipboardData: { files },
    } = e;
    if (files.length != 0) {
      // 파일이 붙여넣어 졌을때
      onDropFiles(files);
    }
    // 그외는 문자열 같은 파일외의 데이터가 붙어넣어 졌을때임
  };

  useEffect(() => {
    window.addEventListener('paste', e => onPaste(e));
    return () => {
      window.removeEventListener('paste', onPaste);
    };
  }, []);

  const onDropFiles = (files: any) => {
    if (files.length > 1) {
      // 1개 초과 파일은 받지 않음
      alert('한 개의 파일만 업로드 가능');
      return;
    }
    const file = files[0];
    const isImageFile = file.type.match(/image/g);
    if (isImageFile === null) {
      // 이미지 파일 이외의 파일은 받지 않음
      alert('이 파일 형식은 업로드 될 수 없음');
      return;
    }
    setIsFile(true);
    setFile(file);
  };

  return (
    <>
      <Dropzone onDrop={onDropFiles} accept={acceptTypes.current} noClick>
        {({ getRootProps, getInputProps, open, isDragActive }) => (
          <Container>
            {/* file drag input */}
            <DropZone {...getRootProps()}>
              <input {...getInputProps()} />
              {/* user custom components */}
            </DropZone>
            <Button onClick={open}>Import images</Button>
          </Container>
        )}
      </Dropzone>
    </>
  );
};

const Container = styled(FullScreen)`
  ${RelativePos}
`;
const DropZone = styled(FullScreen)`
  ${AbsolutePos}
  z-index: 1;
`;
const Button = styled.button`
  ${AbsolutePos}
  z-index: 1;
`;

export default Uploader;
