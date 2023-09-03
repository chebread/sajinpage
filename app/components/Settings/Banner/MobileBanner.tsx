import { desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import { themeVars } from 'layouts/themes';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// (0): google 검색 설정 같이 파랑 line 구현하기

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
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  ${transition('all')}
`;
const Container = styled.div`
  ${transition('all')}
  display: flex;
  @media (${desktopVp}) {
    display: none;
  }
  top: 3rem;
  position: fixed;
  background-color: ${themeVars.light.header_color};
  backdrop-filter: blur(1rem);
  /* background-color: #fff; */
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000; // z-index를 10000으로 하면 shadow가 header를 덮게 됨
  /* box-shadow: 0 20px 20px -20px rgba(0, 0, 0, 0.08); */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
`;

export default MobileBanner;
