import { clickedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp, disableTab } from 'layouts/properties';
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
  ${transition('all')}
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 1rem;
  padding-top: 3.5rem;
  display: flex;
  align-items: center;
`;
const Btn = styled.button`
  all: unset;
  ${disableTab}
  ${transition('all')}
  z-index: 10000;
  cursor: pointer;
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  opacity: 0.8;
  background-color: rgb(235, 235, 235);
  &:active {
    background-color: rgb(220, 220, 220);
    transform: scale(0.85);
    svg {
      transform: scale(0.85);
    }
  }
  svg {
    ${transition('transform')}
    height: 1rem;
  }
`;

export default ViewerMobileMenuBtn;
