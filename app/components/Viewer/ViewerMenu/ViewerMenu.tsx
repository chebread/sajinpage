import { clickedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { centerAlign, desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ViewerBackground from './ViewerBackground';
import ViewerMenuModal from './ViewerMenuModal';
import { ReactComponent as Logo } from 'assets/svg/Logo.svg';
import { ReactComponent as DotIcon } from 'assets/svg/DotIcon.svg';

// mobile에서만 보이며, viewermenu에서 mobile에서 viewermenu를 구현하기 위해 사용되는 컴포넌트임
// (0): 아래에서 위로 스크롤시 edit menu 활성화 됨

const ViewerMenu = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useAtom(clickedAtom);

  const onRedirect = () => {
    navigate('/');
  };
  const onClickMenu = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Btn onClick={onClickMenu}>
            <DotIcon />
          </Btn>
          {/* <Btn onClick={onClickMenu}>
            <Logo />
          </Btn> */}
        </Wrapper>
        <ViewerBackground />
        <ViewerMenuModal />
      </Container>
    </>
  );
};

const Container = styled.div`
  ${transition('all')}
  visibility: visible;
  opacity: 1;
  @media (${desktopVp}) {
    visibility: hidden;
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  ${transition('all')}
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 1.5rem;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
`;
const Btn = styled.button`
  all: unset;
  ${disableTab}
  ${transition('all')}
  z-index: 10000;
  cursor: pointer;
  height: 3rem;
  width: 3rem;
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  background-color: #1e1e1e;
  &:active {
    transform: scale(0.85);
    svg {
      transform: scale(0.85);
    }
  }
  svg {
    ${transition('transform')}
    height: 1rem;
    fill: #ffffff;
  }
  /* margin-bottom: 0.5rem; */
`;

export default ViewerMenu;
