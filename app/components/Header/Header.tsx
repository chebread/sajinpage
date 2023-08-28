import { cssVarsPalette } from 'layouts/cssVars';
import {
  centerAlign,
  desktopVp,
  disableTab,
  landscapeVp,
} from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/svg/Logo.svg';
import { ReactComponent as DotIcon } from 'assets/svg/DotIcon.svg';
import { themeVars } from 'layouts/themes';
import {
  clickedAtom,
  expandedAtom,
  menuClickedAtom,
  viewedAtom,
} from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import MenuModal from 'components/Viewer/Modal/MenuModal';

// (0): svg safari 오류 해결하기 (chrome도 약간 불안정함)
// (0): menu modal시 @keyframes로 threads 같이 구현하기 (visible 사용 x, display 사용 o)
// (0): safari transform y 속성이 위로 스크롤시 보이는 문제 해결하기

const Header = () => {
  const [viewed] = useAtom(viewedAtom); // check that current route is image-viewer
  const [menuClicked, setMenuClicked] = useAtom(menuClickedAtom);
  const [clicked, setClicked] = useAtom(clickedAtom);
  const [expanded] = useAtom(expandedAtom);

  const onMenu = () => {
    setMenuClicked(!menuClicked);
    setClicked(true); // (중요): mobile에서도 동일시하게 적용하기 위해 clicked도 true 함 (토글 하면 안됨, 이유는 이미 모바일에서 true 인데 메뉴 클릭하면 false 되니까 안되요!)
  };

  return (
    <>
      <ContainerWrapper>
        <Container
          visible={viewed ? (clicked ? true : false) : true}
          expanded={expanded}
        >
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
const Container = styled.div<{ visible: boolean; expanded: boolean }>`
  ${transition('all')}
  // for viewer
  margin-bottom: ${({ visible }) => (visible ? 'auto' : '-3rem')};
  transform: ${({ visible }) =>
    visible ? 'translateY(0)' : 'translateY(-100%)'};
  @media (${desktopVp}) {
    margin-bottom: ${({ expanded }) => (expanded ? '-3rem' : 'auto')};
    transform: ${({ expanded }) =>
      expanded ? 'translateY(-100%)' : 'translateY(0)'};
  }
  position: fixed; // (0): fixed로 구성하기
  top: 0;
  height: ${cssVarsPalette.header_height};
  width: 100%;
  display: flex;
  flex-direction: row;
  /* background-color: ${themeVars.light.header_color};
  backdrop-filter: blur(12px); */
  background-color: #fff;
  z-index: 100000;
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
    ${transition('all')}
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
      transform: scale(0.89);
      @media (${desktopVp}) {
        transform: scale(0.97);
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  ${transition('all')}
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  @media (${landscapeVp}) {
    padding-left: calc(${cssVarsPalette.sal} + 1.5rem);
    padding-right: calc(${cssVarsPalette.sar} + 1.5rem);
  }
  @media (${desktopVp}) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;
const Btn = styled.button<{ visible?: boolean }>`
  // 이거 menumodal시 띄워지게 하기
  all: unset;
  ${disableTab}
  ${transition('all')}
  cursor: pointer;
  z-index: 10000; // (0): 왜 안먹히나.
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  z-index: ${({ visible }) => (visible ? '0' : '-1')};
  width: 2.5rem;
  height: 2.5rem;
  @media (${desktopVp}) {
    width: 3.5rem;
    height: 3.5rem;
  }
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  @media (${desktopVp}) {
    &:hover {
      background-color: rgb(235, 235, 235);
      svg {
        transform: scale(1.07);
      }
    }
  }
  &:active {
    background-color: rgb(220, 220, 220);
    transform: scale(0.85);
    @media (${desktopVp}) {
      transform: scale(0.93);
    }
  }
  svg {
    ${transition('all')}
    height: 16px;
    @media (${desktopVp}) {
      height: 19px;
    }
  }
`;

export default Header;
