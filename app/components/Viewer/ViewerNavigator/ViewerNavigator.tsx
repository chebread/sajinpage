import { cssVarsPalette } from 'layouts/cssVars';
import {
  centerAlign,
  desktopHover,
  desktopVp,
  disableTab,
} from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { ReactComponent as UploadIcon } from 'assets/svg/UploadIcon.svg';
import { ReactComponent as SettingsIcon } from 'assets/svg/SettingsIcon.svg';
import { ReactComponent as MyFilesIcon } from 'assets/svg/MyFilesIcon.svg';
import { NavLink } from 'react-router-dom';

// mobile은 nav 제공하지 않음

const ViewerNavigator = () => {
  return (
    <Container>
      <Wrapper>
        <Navigate to="f" onTouchStart={() => {}}>
          <MyFilesIcon />
        </Navigate>
      </Wrapper>
      <Wrapper>
        <Navigate to="/">
          <UploadIcon />
        </Navigate>
      </Wrapper>
      <Wrapper>
        <Navigate to="s">
          <SettingsIcon />
        </Navigate>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: none;
  @media (${desktopVp}) {
    display: block; // 대안 찾기
    position: fixed;
    ${transition('height', 'width')}
    height: ${cssVarsPalette.mobile_nav_height};
    @media (${desktopVp}) {
      height: ${cssVarsPalette.desktop_nav_height};
    }
    width: 100%;
    bottom: 0; // fix bottom
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: #ffffff;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  ${centerAlign}
`;

const Navigate = styled(NavLink)`
  all: unset;
  ${disableTab}
  cursor: pointer;
  height: 2.5rem;
  width: 2.5rem;
  @media (${desktopVp}) {
    height: 3.5rem;
    width: 3.5rem;
  }
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  ${transition('background-color', 'all')}
  @media (${desktopVp}) {
    // (0): (${desktopHover}) 해도 되고 아무 상관은 없을 듯
    &:hover {
      background-color: rgb(235, 235, 235);
      svg {
        transform: scale(1.07);
      }
    }
  }
  &:active {
    background-color: rgb(220, 220, 220);
    svg {
      transform: scale(0.85);
      @media (${desktopVp}) {
        transform: scale(0.98);
      }
    }
  }
  svg {
    ${transition('transform', 'height')}
    height: 1.5rem;
    @media (${desktopVp}) {
      height: 2rem;
    }
  }
`;

export default ViewerNavigator;
