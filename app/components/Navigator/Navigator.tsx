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
import { NavLink } from 'react-router-dom';
import { useAtom } from 'jotai';
import { clickedAtom, viewedAtom } from 'atoms/viewerAtom';

// z-index: 10000; // (0): menumodal background 부분에서 이거 안되는 현상있음 menumodal 부분의 background 완전히 다시 구성해야 할듯
// (0): landscape에서 nav safe area 설정시 "도구 막대 축소"시 safe area 없어지는 문제 있음 (https://developer.apple.com/forums/thread/716552)
// (0): svg 다시 작성하여 nav icon fill 되는 것 구현하기

const Navigator = () => {
  const [viewed] = useAtom(viewedAtom);
  const [clicked] = useAtom(clickedAtom);

  return (
    <Container visible={viewed ? (clicked ? true : false) : true}>
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

const Container = styled.div<{ visible: boolean }>`
  ${transition('all')}
  // for viewer
  transform: ${({ visible }) =>
    visible ? ' translateY(0)' : 'translateY(100%)'};
  @media (${desktopVp}) {
    transform: translateY(0);
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
    &:hover {
      // hover시는 svg만 커짐
      background-color: rgb(235, 235, 235);
      svg {
        transform: scale(1.07);
      }
    }
  }
  &:active {
    // active는 전체적으로 다 축소됨
    background-color: rgb(220, 220, 220);
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

export default Navigator;
