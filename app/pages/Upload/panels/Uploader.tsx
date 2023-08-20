import { useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import hashMaker from 'lib/hashMaker';
import { cssVarsPalette } from 'layouts/cssVars';
import transition from 'layouts/properties/transition';
import filesAtom from 'atoms/filesAtom';

// (0): (Style) 제한 공유 모드 추가 - 파일 받고 중앙 모달로 공유 방식 선택하는 모달 뜸 or 다르게 구성
// (0): 간략한 도움말 만들기 (하단에 도움말(/h)로 가기 버튼 추가) / 문의하기 / policy
// (0): 여기서 setType하기 fileDb에 type이라는 것을 추가하기 (db에도) => video 허용시에
// (0): pdf upload 기능 추가하기

const Uploader = () => {
  const [, setFiles] = useAtom(filesAtom);
  const fileAcceptTypes = {
    // MIME types를 사용함
    // []의 뜻은 없지만 꼭 써주어야 함
    'image/*': [], // 이미지 타입 전체
    'image/avif': [], // firefox에서 avif 파일은 open시에 안뜨기에 추가함
    'application/pdf': [],
  };
  const fileTypeRegex = /(image)|(application\/pdf)/g;
  const fileMaxSize = 5000000; // 500000byte = 5mb

  useEffect(() => {
    // 파일 붙여넣기시
    window.addEventListener('paste', e => onPaste(e));
    return () => {
      window.removeEventListener('paste', onPaste);
    };
  }, []);

  const onDropFiles = useCallback(async (files: any) => {
    const file = files[0];
    const isImageFile = file.type.match(fileTypeRegex); // type이 image, pdf 인지 파일 체크
    const docId = hashMaker();
    const fileId = hashMaker();
    // 1개 초과 파일은 받지 않음
    if (files.length > 1) {
      alert('한 개의 파일만 업로드 가능');
      return;
    }
    // check file's type
    if (isImageFile === null) {
      alert('이 파일 형식은 업로드 될 수 없음');
      return;
    }
    // check file's size (limit 5MB)
    if (file.size >= fileMaxSize) {
      alert('파일의 크기가 너무 커 업로드 될 수 없음');
      return;
    }
    // initialize file
    setFiles(prevState => {
      return {
        ...prevState,
        filed: true,
        file: file,
        docId: docId,
        fileId: fileId,
      };
    });
  }, []); // (0): useCallback에서 [] 전달해도 상관이없나? 일반함수보다 이게 더 효율적인가?
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

  return (
    <>
      <Dropzone onDrop={onDropFiles} accept={fileAcceptTypes} noClick>
        {({ getRootProps, getInputProps, open, isDragActive }) => (
          <>
            <DropZone {...getRootProps()}>
              <input {...getInputProps()} />
              <Container>
                <h1>Upload</h1>
                <Button onClick={open}>Import images</Button>
                <DropGuide visible={isDragActive}>hello</DropGuide>
              </Container>
            </DropZone>
          </>
        )}
      </Dropzone>
    </>
  );
};

const DropGuide = styled.div<{ visible: boolean }>`
  position: absolute;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  z-index: ${({ visible }) =>
    visible ? '0' : '-1'}; // modalcontainer모다는 항시 커야함
`;

const Container = styled.div`
  ${transition('height')}
  position: relative;
  height: 100%;
  width: 100%;
`;
const DropZone = styled.div`
  height: ${cssVarsPalette.content_full_height};
  width: 100%;
`;
const Button = styled.button``;

export default Uploader;
