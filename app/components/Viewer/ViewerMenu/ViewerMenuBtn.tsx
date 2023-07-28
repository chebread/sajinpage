import { clickedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { ReactComponent as DotIcon } from 'assets/svg/DotIcon.svg';
import { useGesture } from '@use-gesture/react';

// mobile

// (0): 위로 스크롤시 modal이 나오게 하거나 이미지 하단 클릭시 modal 나오게 하기 (유도 버튼 만들기)

const ViewerMenuBtn = () => {
  const [clicked, setClicked] = useAtom(clickedAtom);

  const onClickMenu = () => {
    setClicked(!clicked);
  };
  return (
    <>
      <Wrapper>
        {/* <Btn onClick={onClickMenu}>
          <DotIcon />
        </Btn> */}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${transition('all')}
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
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

export default ViewerMenuBtn;
