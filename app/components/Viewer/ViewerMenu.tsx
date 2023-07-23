import { centerAlign } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { ReactComponent as DeleteIcon } from 'assets/svg/DeleteIcon.svg';
import { ReactComponent as ShareIcon } from 'assets/svg/ShareIcon.svg';
import { ReactComponent as MyFilesIcon } from 'assets/svg/MyFilesIcon.svg';

// delete btn
// turn on private mode btn
// turn off private mode btn
// reset time limit btn
// copy url btn

const ViewerMenu = ({ isVisible, onCancel }) => {
  return (
    <>
      {/* <Background isVisible={isVisible}></Background> */}
      <Container isVisible={isVisible}></Container>
    </>
  );
};

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
