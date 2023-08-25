import { useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import hashMaker from 'lib/hashMaker';
import { cssVarsPalette } from 'layouts/cssVars';
import filesAtom from 'atoms/filesAtom';
import checkUrlFormat from 'lib/checkUrlFormat';
import { toast } from 'react-hot-toast';

// (0): useCallback에서 [] 전달해도 상관이없나? 일반함수보다 이게 더 효율적인가?
// (0): (Style) 제한 공유 모드 추가 - 파일 받고 중앙 모달로 공유 방식 선택하는 모달 뜸 or 다르게 구성
// (0): 간략한 도움말 만들기 (하단에 도움말(/h)로 가기 버튼 추가) / 문의하기 / policy
// (0): 여기서 setType하기 fileDb에 type이라는 것을 추가하기 (db에도) => video 허용시에
// (0): pdf upload 기능 추가하기
// (0): toast를 모바일에서 알림으로 대체하기
// *(0): upload시 사진 업로드 or 이미있는 사진 url로 업로드 기능을 추가하기=> 이때는 limited mode를 사진이 아닌 파일 자체에 제공하는 처음에 내가 실수로 제공한 제한 모드 같이 파일에 acesstime timelimit 등등으로 관리해야함
// => 이미있는 pdf 링크로도 업로드 가능케하기 (paste도 가능케하기)
// (0): paste로 하는 것도 있지만, "복사한 url 업로드하기" or "복사한 파일 업로드하기" 기능을 통해 복사한 url 혹은 파일을 클립보드에 접근후 버튼 클릭시 paste 같이 동작하도록 하기
// (0): isDragActive 이용하지 않고 전체 화면에 listener를 두어서 전체에 파일이 drop 인식시 화면에 active 나오게 하기

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
    window.addEventListener('paste', onPaste);
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
  }, []);
  const onPaste = (e: any) => {
    const { clipboardData } = e;
    const pastedText =
      clipboardData.getData('Text') || (window as any).clipboardData;
    const pastedFiles = clipboardData.files;
    // console.log(pastedText);
    // console.log(pastedFiles);
    if (
      pastedText != '' &&
      checkUrlFormat(pastedText) &&
      pastedText != undefined
    ) {
      // 파일 url이 붙여넣어 졌을때
    }
    if (pastedFiles.length != 0) {
      // 파일이 붙여넣어 졌을때
      onDropFiles(pastedFiles);
    }
  };

  return (
    <>
      <Dropzone
        onDrop={onDropFiles}
        accept={fileAcceptTypes}
        noClick
        noKeyboard
        multiple={false}
      >
        {({ getRootProps, getInputProps, open, isDragActive }) => {
          return (
            <>
              <DropZone {...getRootProps()}>
                <input {...getInputProps()} />
                <Container>
                  <div>Upload</div>
                  <Button onClick={open}>Import an image</Button>
                  <DropGuide visible={isDragActive}>hello</DropGuide>
                </Container>
              </DropZone>
            </>
          );
        }}
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
