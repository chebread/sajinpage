import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/svg/Logo.svg';
import { ReactComponent as DotIcon } from 'assets/svg/DotIcon.svg';
import { themeVars } from 'layouts/themes';
import { clickedAtom, viewedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import MenuModal from 'components/Viewer/Modal/MenuModal';

// (0): svg safari 오류 해결하기 (chrome도 약간 불안정함)
// (0): menu modal 삭제가 안됨
// (0): safari transform y 속성이 위로 스크롤시 보이는 문제 해결하기

const Header = () => {
  const [viewed] = useAtom(viewedAtom); // check that current route is image-viewer
  const [clicked, setClicked] = useAtom(clickedAtom);

  const onMenu = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <ContainerWrapper>
        <Container visible={viewed}>
          <AsideLeftWrapper>
            <ButtonWrapper></ButtonWrapper>
          </AsideLeftWrapper>
          <LogoWrapper>
            <LogoBtn to="/">
              <Logo />
            </LogoBtn>
          </LogoWrapper>
          <AsideRightWrapper>
            <ButtonWrapper>
              <Btn visible={viewed} onClick={onMenu}>
                <DotIcon />
              </Btn>
            </ButtonWrapper>
          </AsideRightWrapper>
        </Container>
      </ContainerWrapper>
      <MenuModal />
    </>
  );
};

const ContainerWrapper = styled.div`
  ${transition('padding-top')}
  padding-top: ${cssVarsPalette.header_height};
`;
const Container = styled.div<{ visible: boolean }>`
  ${transition('all')}
  // for viewer
  margin-bottom: ${({ visible }) => (visible ? '-3rem' : 'auto')};
  transform: ${({ visible }) =>
    visible ? 'translateY(-100%)' : 'translateY(0)'};
  @media (${desktopVp}) {
    margin-bottom: auto;
    transform: translateY(0);
  }
  position: fixed; // (0): fixed로 구성하기
  top: 0;
  height: ${cssVarsPalette.header_height};
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${themeVars.light.background_color};
  z-index: 10000;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 33%;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
`;
const AsideLeftWrapper = styled(Wrapper)`
  justify-content: flex-start;
`;
const AsideRightWrapper = styled(Wrapper)`
  justify-content: flex-end;
`;
const LogoWrapper = styled(Wrapper)`
  justify-content: center;
`;

const LogoBtn = styled(Link)`
  all: unset;
  cursor: pointer;
  ${disableTab}
  svg {
    ${transition('transform', 'height')}
    height: 1.5rem;
    width: auto;
    @media (${desktopVp}) {
      height: 2rem;
    }
    @media (${desktopVp}) {
      &:hover {
        transform: scale(1.07);
      }
    }
    &:active {
      transform: scale(0.85);
      @media (${desktopVp}) {
        transform: scale(0.98);
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  ${transition('all')}
  padding-left: 1rem;
  padding-right: 1rem;
  @media (${desktopVp}) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;
const Btn = styled.button<{ visible?: boolean }>`
  // 이거 menumodal시 띄워지게 하기
  all: unset;
  ${transition('all')}
  cursor: pointer;
  z-index: 10000; // (0): 왜 안먹히나.
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  z-index: ${({ visible }) => (visible ? '0' : '-1')};
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  &:hover {
    background-color: rgb(235, 235, 235);
    svg {
      transform: scale(1.07);
    }
  }
  &:active {
    background-color: rgb(220, 220, 220);
    svg {
      transform: scale(0.98);
    }
  }
  svg {
    ${transition('all')}
    height: 1.2rem; // 1.1rem
  }
`;

export default Header;
