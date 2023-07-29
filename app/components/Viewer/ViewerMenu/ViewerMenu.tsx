import { desktopVp } from 'layouts/properties';
import mobileVp from 'layouts/properties/mobileVp';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import ViewerMenuBtn from './ViewerMenuBtn';

const ViewerMenu = () => {
  return (
    <>
      <Container>
        <ViewerMenuBtn />
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
