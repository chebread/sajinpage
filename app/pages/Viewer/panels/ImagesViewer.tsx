import { useRef, useState } from 'react';
import getUrl from 'lib/getUrl';
import { ImagesScreen } from 'layouts/Screens';
import onDelete from 'components/Viewer/onDelete';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import onCopy from 'components/Viewer/onCopy';
import onDownload from 'components/Viewer/onDownload';
import ModalEditor from 'components/Viewer/ModalEditor';
import styled from 'styled-components';

// (0): 파일 업로드후 여기에서 desc 가져와서 bottom modal로 출력하며, 없거나 있어도 편집하기 버튼을 통해 description 수정 가능
// => 수정은 useState로 저장하며 하나의 컴포넌트에서 수행함
// (0): Download btn
// (0): Delete btn
// (0): Copy url btn

const ImagesViewer = ({ src, docId }) => {
  const url = useRef(getUrl()); // current app url
  const [editToggle, setEditToggle] = useState(true);

  const onEditToggle = () => {
    setEditToggle(!editToggle);
  };

  // 기능을 작동시키는 버튼만 존재. 버튼의 component는 따로 구현
  return (
    <>
      <ImagesScreen src={src} />
    </>
  );
};

export default ImagesViewer;
