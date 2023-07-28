import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/svg/Logo.svg';
import { ReactComponent as DotIcon } from 'assets/svg/DotIcon.svg';
import { clickedAtom, loadedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { useState } from 'react';

// (0): mobile은 header는 간략히 제공함
// (0): 컴포넌트를 분리하여 mobile, desktop 따로 처리하기

const ViewerHeader = () => {
  const [clicked, setClicked] = useState(false);
  const [loaded] = useAtom(loadedAtom); // check that current route is viewer

  const onClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <DesktopContainer>
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
            {loaded ? (
              <Btn onClick={onClick}>
                <DotIcon />
              </Btn>
            ) : (
              ''
            )}
          </ButtonWrapper>
        </AsideRightWrapper>
      </DesktopContainer>
      <MobileContainer>hello</MobileContainer>
    </>
  );
};

const MobileContainer = styled.div`
  ${transition('all')}
  visibility: visible;
  opacity: 1;
  @media (${desktopVp}) {
    visibility: hidden;
    opacity: 0;
  }
  position: absolute;
  top: 0;
  padding: 1rem;
`;

const DesktopContainer = styled.div`
  ${transition('all')}
  margin-bottom: -3rem;
  transform: translateY(-100%);
  @media (${desktopVp}) {
    margin-bottom: auto;
    transform: translateY(0);
  }
  position: sticky; // (0): fixed로 구성하기
  top: 0;
  z-index: 10000;
  height: ${cssVarsPalette.mobile_header_height};
  @media (${desktopVp}) {
    height: ${cssVarsPalette.desktop_header_height};
  }
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
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
const Btn = styled.button`
  all: unset;
  cursor: pointer;
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
