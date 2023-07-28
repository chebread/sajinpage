import { clickedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { centerAlign, desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { ReactComponent as MoreIcon } from 'assets/svg/DotIcon.svg';

// (0): 위로 스크롤시 modal이 나오게 하거나 이미지 하단 클릭시 modal 나오게 하기 (유도 버튼 만들기)
// (0): 아직은 btn 추가하지 않고 viewer만 수행함 (레이아웃 어떻게 해야할지 겁나게 고민임) 드래깅이 제일로서 나을 것 같은디...

const ViewerMenuBtn = () => {
  const [clicked, setClicked] = useAtom(clickedAtom);

  const onClickMenu = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <Wrapper>
        {/* <Btn onClick={onClickMenu}>
          <MoreIcon />
        </Btn> */}
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
  padding-top: 1.5rem;
  padding-left: 1.5rem;
  display: flex;
  align-items: center;
  position: fixed;
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
  background-color: rgb(30, 30, 30);
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
    fill: white;
  }
`;

export default ViewerMenuBtn;
