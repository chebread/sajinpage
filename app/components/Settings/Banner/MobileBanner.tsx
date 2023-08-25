import { desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MobileBanner = () => {
  const params = useParams();
  const type = params.type;

  return (
    <Container>
      <Navigate className={type === undefined ? 'active' : ''} to="/s">
        설정
      </Navigate>
      <Navigate className={type === 'a' ? 'active' : ''} to="/s/a">
        추가 리소스
      </Navigate>
    </Container>
  );
};

const Navigate = styled(Link)`
  all: unset;
  cursor: pointer;
  ${disableTab}
  font-size: 0.9rem;
  @media (${desktopVp}) {
    font-size: 1rem;
  }
  font-weight: 500;
  color: #70757a;
  &.active {
    color: #1969d2;
  }
`;
const Container = styled.div`
  ${transition('all')}
  display: flex;
  @media (${desktopVp}) {
    display: none;
  }
  top: 3rem;
  position: sticky;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
`;

export default MobileBanner;
