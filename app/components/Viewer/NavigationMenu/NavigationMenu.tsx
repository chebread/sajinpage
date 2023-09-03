import { menuClickedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { cssVarsPalette } from 'layouts/cssVars';
import {
  desktopVp,
  disableTab,
  landscapeVp,
  transition,
} from 'layouts/properties';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as UploadIcon } from 'assets/svg/UploadIcon.svg';
import { ReactComponent as SettingsIcon } from 'assets/svg/SettingsIcon.svg';
import { ReactComponent as MyFilesIcon } from 'assets/svg/MyFilesIcon.svg';
import { ReactComponent as HomeIcon } from 'assets/svg/HomeIcon.svg';

// header component 내부에서 출력됨

const NavigationMenu = () => {
  const [menuClicked] = useAtom(menuClickedAtom);
  return (
    <>
      <Container visible={menuClicked}>
        <Navigate to="/" end>
          <HomeIcon />홈
        </Navigate>
        <Navigate to="/u" end>
          <UploadIcon />
          파일 업로드
        </Navigate>
        <Navigate to="/f" end>
          <MyFilesIcon />
          My files
        </Navigate>
        <Navigate to="/s" end>
          <SettingsIcon />
          설정
        </Navigate>
      </Container>
    </>
  );
};

const Navigate = styled(NavLink)`
  all: unset;
  ${disableTab}
  ${transition('all')}
  cursor: pointer;
  width: auto;
  padding: 1.5rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  @media (${desktopVp}) {
    font-size: 1rem;
  }
  font-weight: 500;
  background-color: rgb(245, 245, 245);
  &:active {
    /* background-color: rgb(220, 220, 220); */
    background-color: rgb(235, 235, 235);
    transform: scale(0.98);
  }
  svg {
    height: 1.5rem;
    fill: #1969d2;
  }
`;
const Container = styled.div<{ visible: boolean }>`
  ${transition('all')}
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  z-index: ${({ visible }) => (visible ? '1000000' : '-1')};
  @media (${desktopVp}) {
    visibility: hidden;
    opacity: 0;
    z-index: -1;
  }
  position: fixed;
  top: 3rem;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${cssVarsPalette.content_full_height};
  width: auto;
  background-color: #ffffff;
  padding: 2rem 1rem 2rem 1rem;
  @media (${landscapeVp}) {
    padding-left: calc(1rem + ${cssVarsPalette.sal});
    padding-right: calc(1rem + ${cssVarsPalette.sar});
  }
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default NavigationMenu;
