import { clickedAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';

const ViewerBackground = () => {
  const [clicked, setClicked] = useAtom(clickedAtom);
  const onCancel = () => {
    setClicked(!clicked);
  };

  return <Container visible={clicked} onClick={onCancel} />;
};

type ViewerMenuPropsType = {
  visible?: boolean;
};
const Container = styled.div<ViewerMenuPropsType>`
  display: block;
  ${transition('all')}
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: ${({ visible }) => (visible ? '10000' : '-1')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

export default ViewerBackground;
