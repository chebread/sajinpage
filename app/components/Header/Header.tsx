import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/svg/Logo.svg';
import { ReactComponent as Menu } from 'assets/svg/Menu.svg';
import { useState } from 'react';
import Navigator from './Navigator';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isClicked, setIsClicked] = useState(true); // 이 기능은 desktop에서만 적용함 (모바일은 그냥 바로 nav 제공)

  const onClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <Container>
        <AsideLeftWrapper>
          <ButtonWrapper>
            <MenuBtn onClick={onClick}>
              <Menu />
            </MenuBtn>
          </ButtonWrapper>
        </AsideLeftWrapper>
        <LogoWrapper>
          <LogoBtn to="/">
            <Logo />
          </LogoBtn>
        </LogoWrapper>
        <AsideRightWrapper>
          <ButtonWrapper></ButtonWrapper>
        </AsideRightWrapper>
      </Container>
      <Navigator isVisible={isClicked} onClickCancel={onClick} />
    </>
  );
};

const Container = styled.div`
  position: relative;
  // animation
  ${transition('height', 'width')}
  height: ${cssVarsPalette.mobile_header_height};
  @media (${desktopVp}) {
    height: ${cssVarsPalette.desktop_header_height};
  }
  display: flex;
  flex-direction: row;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 33%;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  ${transition('opacity')}
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
  svg {
    ${transition('transform')}
    height: 2rem;
    &:hover {
      transform: scale(1.07);
    }
    &:active {
      transform: scale(0.98);
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
const MenuBtn = styled.button`
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
      ${transition('transform')}
      transform: scale(1.07);
    }
  }
  &:active {
    background-color: rgb(220, 220, 220);
    svg {
      ${transition('transform')}
      transform: scale(0.98);
    }
  }
  svg {
    height: 1.1rem;
  }
`;

export default Header;
