import styled from 'styled-components';
import { FullScreen } from 'layouts/Screens';
import { useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { docIdAtom, fileAtom, isFileAtom } from 'atoms';
import { useAtom } from 'jotai';
import { AbsolutePos, RelativePos } from 'layouts/properties';
import hashMaker from 'lib/hashMaker';
import { fileIdAtom } from 'atoms/filesAtom';

// (0): (Style) 제한 공유 모드 추가 - 파일 받고 중앙 모달로 공유 방식 선택하는 모달 뜸
// (0): 간략한 도움말 만들기
// (0): 여기서 setType하기 fileDb에 type이라는 것을 추가하기 (db에도)

// 파일을 사용자로부터 받아오는 부분

const Uploader = () => {
  const [, setFile] = useAtom(fileAtom);
  const [, setIsFile] = useAtom(isFileAtom);
  const [, setDocId] = useAtom(docIdAtom);
  const [, setFileId] = useAtom(fileIdAtom);
  const fileAcceptTypes = {
    // MIME types를 사용함
    // []의 뜻은 없지만 꼭 써주어야 함
    'image/*': [], // 이미지 타입 전체
    'image/avif': [], // firefox에서 avif 파일은 open시에 안뜨기에 추가함
  };
  const fileTypeRegex = /image/g;
  const fileMaxSize = 5000000; // 500000byte = 5mb

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
    // 이미지 붙여넣기시
    window.addEventListener('paste', e => onPaste(e));
    return () => {
      window.removeEventListener('paste', onPaste);
    };
  }, []);

  const onDropFiles = async (files: any) => {
    if (files.length > 1) {
      // 1개 초과 파일은 받지 않음
      alert('한 개의 파일만 업로드 가능');
      return;
    }
    const file = files[0];
    // check file's type
    const isImageFile = file.type.match(fileTypeRegex); // type이 image, pdf, video 인지 파일 체크
    if (isImageFile === null) {
      // Image 이외의 파일은 받지 않음
      alert('이 파일 형식은 업로드 될 수 없음');
      return;
    }
    // check file's size (limit 5MB)
    if (file.size >= fileMaxSize) {
      alert('파일의 크기가 너무 커 업로드 될 수 없음');
      return;
    }
    const docId = hashMaker();
    const fileId = hashMaker();
    // initialize file
    // 파일 최적화는 일단은 하지 않음
    setIsFile(true);
    setFile(file);
    setDocId(docId);
    setFileId(fileId);
  };

  return (
    <>
      <Dropzone onDrop={onDropFiles} accept={fileAcceptTypes} noClick>
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
