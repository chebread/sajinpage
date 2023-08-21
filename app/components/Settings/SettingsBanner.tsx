import { cssVarsPalette } from 'layouts/cssVars';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// (0): settingsbanner desktop / mobile 나누어서 mobile은 설정 / 추가 리소스로 전달함

const SettingsBanner = () => {
  return (
    <Container>
      <Link to="/s">설정</Link>
      <Link to="/s/h">도움말</Link>
      <Link to="/s/p">서비스 정책</Link>
    </Container>
  );
};

const Container = styled.div`
  /* padding: 34px 12px 12px; */
  height: calc(100vh - 8rem);
  min-width: 336px;
  background-color: seagreen;
`;

export default SettingsBanner;
