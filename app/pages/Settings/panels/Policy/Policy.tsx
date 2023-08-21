import { desktopVp } from 'layouts/properties';
import styled from 'styled-components';

const Policy = () => {
  return (
    <Container>
      <div>서비스 정책</div>
      <div>개인정보 취급 방침</div>
      <div>서비스 이용약관</div>
    </Container>
  );
};

const Container = styled.div`
  padding: 34px 18px 18px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  margin-bottom: 3rem;
  @media (${desktopVp}) {
    margin-bottom: 4rem;
  }
`;

export default Policy;
