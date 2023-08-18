import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { ReactComponent as UploadIcon } from 'assets/svg/UploadIcon.svg';
import { ReactComponent as SettingsIcon } from 'assets/svg/SettingsIcon.svg';
import { ReactComponent as MyFilesIcon } from 'assets/svg/MyFilesIcon.svg';
import { NavLink } from 'react-router-dom';

const Navigator = () => {
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
  position: fixed;
  ${transition('height', 'width')}
  height: ${cssVarsPalette.nav_height};
  width: 100%;
  bottom: 0; // fix bottom
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #ffffff;
  box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.3);
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
      background-color: rgb(235, 235, 235);
      svg {
        transform: scale(1.07);
        // (0): instagram 처럼 속이 채워지기 하기! (이건 다른 fill[ICONNAME]Icon 을 만들어서 대체하거나 여 코드에서 처리하기
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

export default Navigator;
