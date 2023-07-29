import { desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import ViewerMenuBtn from './ViewerMenuBtn';

// mobile에서만 보이며, viewermenu에서 mobile에서 viewermenu를 구현하기 위해 사용되는 컴포넌트임
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
