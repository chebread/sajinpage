import { clickedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from 'assets/svg/ArrowIcon.svg';
import BottomButton from 'components/BottomButton';

// (0): 위로 스크롤시 modal이 나오게 하거나 이미지 하단 클릭시 modal 나오게 하기 (유도 버튼 만들기)

const ViewerMenuBtn = () => {
  const [clicked, setClicked] = useAtom(clickedAtom);

  const onClickMenu = () => {
    setClicked(!clicked);
  };
  return (
    <>
      <Wrapper>
        <BtnWrapper>
          <Btn onClick={onClickMenu}>
            <ArrowIcon />
          </Btn>
        </BtnWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${transition('all')}
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;
const BtnWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
const Btn = styled.button`
  all: unset;
  margin: 1rem;
  position: fixed;
  z-index: 10000;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  ${transition('background-color', 'transform')}
  background-color: rgb(240, 240, 240);
  &:hover {
    background-color: rgb(235, 235, 235);
    transform: scale(1.07);
    svg {
      transform: scale(1.07);
    }
  }
  &:active {
    background-color: rgb(220, 220, 220);
    transform: scale(0.98);
    svg {
      transform: scale(0.98);
    }
  }
  svg {
    ${transition('transform')}
    height: 1rem;
  }
`;

export default ViewerMenuBtn;
