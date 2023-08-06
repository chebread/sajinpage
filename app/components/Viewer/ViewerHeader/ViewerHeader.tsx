import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/svg/Logo.svg';
import { ReactComponent as DotIcon } from 'assets/svg/DotIcon.svg';
import { clickedAtom, onCancelAtom, viewedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { themeVars } from 'layouts/themes';
import MenuModal from '../Modal/MenuModal';

// (0): 여기에 background를 위치해서 modal 클릭시에 bg 클릭시 없어지게 구성하기! (menumodal or floatmodal 적용)

const ViewerHeader = () => {
  const [viewed] = useAtom(viewedAtom); // check that current route is viewer
  const [clicked, setClicked] = useAtom(clickedAtom);
  const [, onCancel] = useAtom(onCancelAtom);

  const onMenu = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <ContainerWrapper>
        <Container>
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
const Container = styled.div`
  ${transition('all')}
  position: fixed;
  margin-bottom: -3rem;
  transform: translateY(-100%);
  @media (${desktopVp}) {
    margin-bottom: auto;
    transform: translateY(0);
  }
  top: 0;
  z-index: 10000;
  height: ${cssVarsPalette.header_height};
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${themeVars.light.background_color};
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
    @media (${desktopVp}) {
      height: 2rem;
    }
    @media (${desktopVp}) {
      &:hover {
        transform: scale(1.07);
      }
    }
    &:active {
      transform: scale(0.88);
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
const Btn = styled.button<{ visible: boolean }>`
  all: unset;
  cursor: pointer;
  ${transition('all')}
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  z-index: ${({ visible }) => (visible ? '0' : '-1')};

  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  ${transition('background-color')}
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
    ${transition('transform')}
    height: 1.1rem;
  }
`;

export default ViewerHeader;

{
  /* <FloatModalContainer visible={resetToggle}>
            <Select onChange={onModeSelect} options={timeLimitOptions} />
            <button onClick={onCancel}>취소</button>
          </FloatModalContainer>
          <FloatModalContainer visible={modeToggle}>
            <button onClick={onResetToggle}>limit mode 값 재설정하기</button>
            <button onClick={onTurnOffLimitMode}>limit mode 끄기</button>
            <button onClick={onCancel}>취소</button>
          </FloatModalContainer> */
}

{
  /* <FloatWrapper visible={resetToggle}>
              <Select onChange={onModeSelect} options={timeLimitOptions} />
              <button onClick={() => setResetToggle(false)}>취소</button>
            </FloatWrapper>
            <FloatWrapper visible={!resetToggle}>
              <button onClick={onResetToggle}>limit mode 값 재설정하기</button>
              <button onClick={onTurnOffLimitMode}>limit mode 끄기</button>
              <button onClick={onCancel}>취소</button>
            </FloatWrapper> */
}

// const FloatWrapper = styled.div<ModalPropsType>`
//   visibility: hidden;
//   opacity: 0;
//   z-index: -1;
//   @media (${desktopVp}) {
//     ${transition('all')}
//     visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
//     opacity: ${({ visible }) => (visible ? 1 : 0)};
//     z-index: ${({ visible }) => (visible ? '1000000' : '-1')};
//   }
//   background-color: seagreen;
// `;
