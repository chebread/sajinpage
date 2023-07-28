import { desktopVp } from 'layouts/properties';
import mobileVp from 'layouts/properties/mobileVp';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import ViewerBackground from './ViewerBackground';
import ViewerMenuBtn from './ViewerMenuBtn';
import ViewerMenuModal from './ViewerMenuModal';

const ViewerMenu = () => {
  return (
    <>
      <Container>
        <ViewerMenuBtn />
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

export default ViewerMenu;
