import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as SettingsIcon } from 'assets/svg/SettingsIcon.svg';
import { ReactComponent as HelpIcon } from 'assets/svg/HelpIcon.svg';
import { ReactComponent as PolicyIcon } from 'assets/svg/PolicyIcon.svg';
import transition from 'layouts/properties/transition';
import { disableTab } from 'layouts/properties';

// (0): settingsbanner desktop / mobile 나누어서 mobile은 설정 / 추가 리소스로 전달함

const SettingsBanner = () => {
  return (
    <>
      <Container>
        <Navigate to="/s" end>
          <SettingsIcon />
          설정
        </Navigate>
        <Navigate to="/s/h" end>
          <HelpIcon />
          도움말
        </Navigate>
        <Navigate to="/s/p" end>
          <PolicyIcon />
          서비스 정책
        </Navigate>
      </Container>
    </>
  );
};

const Container = styled.div`
  top: 4rem;
  position: sticky;
  padding: 34px 12px 12px;
  height: 100%;
  min-width: 21rem;
  display: flex;
  flex-direction: column;
`;
const Navigate = styled(NavLink)<{ active?: any }>`
  all: unset;
  ${transition('all')}
  ${disableTab}
  cursor: pointer;
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  &.active {
    background-color: #e8f0fe;
    color: #1967d2;
    svg {
      fill: #1967d2;
    }
  }
  &:hover {
    color: #1967d2;
    svg {
      fill: #1967d2;
    }
  }
  &:active {
    background-color: rgb(222, 230, 244);
  }
  color: #70757a;
  border-radius: 9999px;
  svg {
    ${transition('all')}
    height: 1.5rem;
    fill: #70757a;
  }
`;

export default SettingsBanner;
