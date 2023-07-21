import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp } from 'layouts/properties';
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
        <Navigate to="f">
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
  // animation
  ${transition('height', 'width')}
  height: ${cssVarsPalette.mobile_header_height};
  width: 100%;
  bottom: 0;
  @media (${desktopVp}) {
    height: ${cssVarsPalette.desktop_header_height};
  }
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #ffffff;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${transition('opacity')}
`;

const Navigate = styled(NavLink)`
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
    height: 2rem;
  }
`;

export default Navigator;
