import { useRef } from 'react';
import getUrl from 'lib/getUrl';
import { ImagesScreen } from 'layouts/Screens';

// (*): 삭제 기능 / 사진 설명 추가 기능 / 축소-확대 기능 / 공유기능 / 파일 다운로드 기능

const ImagesViewer = ({ src }) => {
  const url = useRef(getUrl()); // current app url

  return <ImagesScreen src={src} />;
};

export default ImagesViewer;
