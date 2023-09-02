import { desktopVp } from 'layouts/properties';
import styled from 'styled-components';

const MobileUploader = ({ open, onDropUrl }) => {
  return (
    <>
      <Container>hello</Container>
    </>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: block;
  @media (${desktopVp}) {
    display: none;
  }
`;

export default MobileUploader;
