import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { ReactComponent as UploadIcon } from 'assets/svg/UploadIcon.svg';
import { ReactComponent as SettingsIcon } from 'assets/svg/SettingsIcon.svg';
import { ReactComponent as MyFilesIcon } from 'assets/svg/MyFilesIcon.svg';
import { NavLink } from 'react-router-dom';
import { useAtom } from 'jotai';
import { viewedAtom } from 'atoms/viewerAtom';

const Navigator = () => {
  const [viewed] = useAtom(viewedAtom);

  return (
    <Container visible={viewed}>
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
    visible ? 'translateY(100%)' : ' translateY(0)'};
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
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
  // z-index: 10000; // (0): menumodal background 부분에서 이거 안되는 현상있음 menumodal 부분의 background 완전히 다시 구성해야 할듯
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  ${centerAlign}
  .active {
    // (0): svg 다시 작성하여 fill 되는 것 구현하기
  }
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
