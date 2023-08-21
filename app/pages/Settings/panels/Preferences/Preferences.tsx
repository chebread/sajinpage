import { desktopVp } from 'layouts/properties';
import styled from 'styled-components';

const Preferences = () => {
  return (
    <Container>
      <div>설정</div>
    </Container>
  );
};

const Container = styled.div`
  padding: 34px 18px 18px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 8rem);
  width: 100%;
`;

export default Preferences;
