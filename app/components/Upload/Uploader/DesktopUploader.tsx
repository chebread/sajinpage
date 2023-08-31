import { desktopVp, transition } from 'layouts/properties';
import styled from 'styled-components';

const DesktopUploader = ({ open }) => {
  const onClickUrlUpload = () => {
    // toast('복사한 이미지 링크를 이 페이지에 붙여넣어 주세요.');
  };

  return (
    <>
      <Container>
        <Button onClick={open}>업로드</Button>
        <Button onClick={onClickUrlUpload}>링크 업로드</Button>
      </Container>
    </>
  );
};

const Container = styled.div`
  ${transition('all')}
  height: 100%;
  width: 100%;
  display: none;
  @media (${desktopVp}) {
    display: block;
  }
`;
const Button = styled.button``;

export default DesktopUploader;
