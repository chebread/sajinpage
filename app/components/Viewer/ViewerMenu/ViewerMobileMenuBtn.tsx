import { clickedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { ReactComponent as DotIcon } from 'assets/svg/DotIcon.svg';

// mobile viewer menu btn임
// (0): threads 처럼 구성하기

const ViewerMobileMenuBtn = () => {
  const [clicked, setClicked] = useAtom(clickedAtom);

  const onClickMenu = () => {
    setClicked(!clicked);
  };
  return (
    <>
      <Wrapper>
        <Btn onClick={onClickMenu}>
          <DotIcon />
        </Btn>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${transition('height', 'width')}
  height: ${cssVarsPalette.mobile_header_height};
  @media (${desktopVp}) {
    height: ${cssVarsPalette.desktop_header_height};
  }
  position: fixed;
  z-index: 10000;
  top: 0;
  right: 0;
  ${transition('all')}
  padding-right: 1rem;
  @media (${desktopVp}) {
    padding-right: 3rem;
  }
  display: flex;
  align-items: center;
  background-color: seagreen;
`;
const Btn = styled.button`
  all: unset;
  position: sticky;
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
    @media (${desktopVp}) {
      height: 1.1rem;
    }
  }
`;

export default ViewerMobileMenuBtn;
