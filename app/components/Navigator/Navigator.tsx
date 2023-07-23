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
  ${transition('height', 'width')}
  height: ${cssVarsPalette.mobile_header_height};
  @media (${desktopVp}) {
    height: ${cssVarsPalette.desktop_header_height};
  }
  width: 100%;
  bottom: 0; // fix bottom
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #ffffff;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  ${centerAlign}
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
      transform: scale(
        1.07
      ); // 외부 svg에 hover 설정시 svg 크기만 hover 영역이 되기에 Navigate 자체에서 hover 처리하여 svg 크기를 조절해 줘야함
    }
  }
  &:active {
    background-color: rgb(220, 220, 220);
    svg {
      transform: scale(0.98);
    }
  }
  svg {
    ${transition(
      'transform'
    )} // 이렇게 전역에서 적용 해야줘야지 hover, active animation이 끊기지 않고 적용됨
    height: 2rem;
  }
`;

export default Navigator;
