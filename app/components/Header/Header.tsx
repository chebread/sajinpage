import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/svg/Logo.svg';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import getUrl from 'lib/getUrl';

// redirect시 atom value 초기화는 필요 없음
// (0): / 일때는 uploader 버튼이 색상이 있으며 /f 일때는 myfiles 버튼이 색상이 있다 (thisishaneum v2 같이 한다)
// (0): 해더를 뺀 full screen layout 추가하기

const Header = () => {
  // is viewer
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false); // 이 기능은 desktop에서만 적용함 (모바일은 그냥 바로 nav 제공)

  const onHover = () => {
    // setIsHovered(true);
  };
  const unHover = () => {
    // setIsHovered(false);
  };
  return (
    <Container
      onMouseEnter={onHover}
      onMouseLeave={unHover}
      onTouchStart={onHover}
      onTouchEnd={unHover}
    >
      <AsideLeftWrapper isVisible={isHovered}>
        <RedirectBtn to="/">Upload</RedirectBtn>
        <RedirectBtn to="/f">My files</RedirectBtn>
      </AsideLeftWrapper>
      <LogoWrapper>
        <LogoBtn to="/">
          <Logo />
        </LogoBtn>
      </LogoWrapper>
      <AsideRightWrapper isVisible={isHovered}>
        <RedirectBtn to="/s">Settings</RedirectBtn>
      </AsideRightWrapper>
    </Container>
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
  &:hover {
    opacity: 1;
  }
`;
type WrapperPropsType = {
  isVisible?: boolean;
};

const Wrapper = styled.div<WrapperPropsType>`
  height: 100%;
  width: 33%;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  ${transition('opacity')}
  margin-left: 3rem;
  margin-right: 3rem;
`;
const AsideLeftWrapper = styled(Wrapper)`
  justify-content: flex-start;
  @media (${desktopVp}) {
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  }
`;
const AsideRightWrapper = styled(Wrapper)`
  justify-content: flex-end;
  @media (${desktopVp}) {
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  }
`;
const LogoWrapper = styled(Wrapper)`
  justify-content: center;
`;

const LogoBtn = styled(NavLink)`
  all: unset;
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
const RedirectBtn = styled(NavLink)`
  all: unset;
  margin-right: 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;
export default Header;
