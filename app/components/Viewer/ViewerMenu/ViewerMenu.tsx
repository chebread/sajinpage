import mobileVp from 'layouts/properties/mobileVp';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import Background from '../Background';
import ViewerMobileMenuBtn from './ViewerMobileMenuBtn';
import ViewerMenuModal from './ViewerMobileMenuModal';

const ViewerMenu = () => {
  return (
    <>
      <Container>
        <ViewerMobileMenuBtn />
      </Container>
      <Background />
      <ViewerMenuModal />
    </>
  );
};

const Container = styled.div`
  ${transition('all')}/* transform: translateX(100%);
  @media (${mobileVp}) {
    transform: translateX(0);
  } */
`;

export default ViewerMenu;
