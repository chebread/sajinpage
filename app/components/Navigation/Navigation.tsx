import { cssVars, cssVarsPalette } from 'layouts/cssVars';
import {
  centerAlign,
  desktopVp,
  disableTab,
  landscapeVp,
} from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { ReactComponent as UploadIcon } from 'assets/svg/UploadIcon.svg';
import { ReactComponent as SettingsIcon } from 'assets/svg/SettingsIcon.svg';
import { ReactComponent as MyFilesIcon } from 'assets/svg/MyFilesIcon.svg';
import { ReactComponent as HomeIcon } from 'assets/svg/HomeIcon.svg';

import { NavLink } from 'react-router-dom';
import { useAtom } from 'jotai';
import { expandedAtom, viewedAtom } from 'atoms/viewerAtom';
import { Link } from 'react-router-dom';

// (0): landscape에서 nav safe area 설정시 "도구 막대 축소"시 safe area 없어지는 문제 있음 (https://developer.apple.com/forums/thread/716552)
// (0): svg 다시 작성하여 nav icon fill 되는 것 구현하기

const Navigation = () => {
  const [viewed] = useAtom(viewedAtom);
  const [expanded] = useAtom(expandedAtom);

  return (
    <Container visible={viewed ? false : true} expanded={expanded}>
      <Wrapper>
        <Navigate to="/">
          <HomeIcon />
        </Navigate>
      </Wrapper>
      <Wrapper>
        <Navigate to="u">
          <UploadIcon />
        </Navigate>
      </Wrapper>
      <Wrapper>
        <Navigate to="f">
          <MyFilesIcon />
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

const Container = styled.div<{ visible: boolean; expanded: boolean }>`
  ${transition('all')}
  // for viewer
  transform: ${({ visible }) =>
    visible ? ' translateY(0)' : 'translateY(100%)'};
  @media (${desktopVp}) {
    transform: ${({ expanded }) =>
      expanded ? 'translateY(100%)' : 'translateY(0)'};
  }
  position: fixed;
  height: ${cssVarsPalette.nav_height};
  width: 100%;
  bottom: 0; // fix bottom
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #fff;
  @media (${landscapeVp}) {
    padding-bottom: env(safe-area-inset-bottom);
  }
  /* box-shadow: 0px -20px 20px -20px rgba(0, 0, 0, 0.08); */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
  z-index: 0;
`;

const Wrapper = styled.div`
  all: unset;
  display: flex;
  flex-direction: row;
  ${centerAlign}
  width: 25%;
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
    &:hover {
      svg {
        transform: scale(1.07);
      }
    }
  }
  &:active {
    transform: scale(0.85);
    @media (${desktopVp}) {
      transform: scale(0.93);
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

export default Navigation;
