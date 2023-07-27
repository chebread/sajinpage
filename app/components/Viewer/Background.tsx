import { clickedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';

const Background = () => {
  const [clicked, setClicked] = useAtom(clickedAtom);
  const onCancel = () => {
    setClicked(!clicked);
  };

  return <Container isVisible={clicked} onClick={onCancel} />;
};

type ViewerMenuPropsType = {
  isVisible?: boolean;
};
const Container = styled.div<ViewerMenuPropsType>`
  @media (${desktopVp}) {
    // (0): background 수정하기
    ${transition('all')}
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    z-index: 10000;
    // backdrop-filter: blur(0.5rem);
    visibility: ${({ isVisible }) => (isVisible ? 'visble' : 'hidden')};
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  }
`;

export default Background;
