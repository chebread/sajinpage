import { useRef, useState } from 'react';
import getUrl from 'lib/getUrl';
import { ImagesScreen } from 'layouts/Screens';
import onDelete from 'components/Viewer/onDelete';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import onCopy from 'components/Viewer/onCopy';
import onDownload from 'components/Viewer/onDownload';
import ModalEditor from 'components/Viewer/ModalEditor';
import styled from 'styled-components';

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
