import { centerAlign, desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { ReactComponent as DeleteIcon } from 'assets/svg/DeleteIcon.svg';
import { ReactComponent as ShareIcon } from 'assets/svg/ShareIcon.svg';
import { ReactComponent as MyFilesIcon } from 'assets/svg/MyFilesIcon.svg';
import { ReactComponent as DotIcon } from 'assets/svg/DotIcon.svg';
import { useState } from 'react';
import { cssVarsPalette } from 'layouts/cssVars';

// delete btn
// turn on private mode btn
// turn off private mode btn
// reset time limit btn
// copy url btn

const ViewerMenu = () => {
  const [isClicked, setIsClicked] = useState(false);

  const onClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <Wrapper>
        <Btn onClick={onClick}>
          <DotIcon />
        </Btn>
      </Wrapper>
      {/* <Background isVisible={isVisible}></Background> */}
      <Container isVisible={isClicked}></Container>
    </>
  );
};

const Wrapper = styled.div`
  ${transition('height', 'width')}
  height: ${cssVarsPalette.mobile_header_height};
  @media (${desktopVp}) {
    height: ${cssVarsPalette.desktop_header_height};
  }
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  ${transition('all')}
  padding-left: 1rem;
  padding-right: 1rem;
  @media (${desktopVp}) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
  display: flex;
  align-items: center;
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

type ViewerMenuPropsType = {
  isVisible?: boolean;
};
const Background = styled.div<ViewerMenuPropsType>`
  ${transition('all')}
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 10000;
  backdrop-filter: blur(0.5rem);
  visibility: ${({ isVisible }) => (isVisible ? 'visble' : 'hidden')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;
const Container = styled.div<ViewerMenuPropsType>`
  position: fixed;
  bottom: 0;
  height: 20%;
  width: 100%;
  z-index: 10000;
  transform-origin: 0 100%;
  ${transition('transform')}
  transform: ${({ isVisible }) =>
    isVisible ? 'translateY(0)' : 'translateY(100%)'};
  background-color: #fff;
`;

export default ViewerMenu;
