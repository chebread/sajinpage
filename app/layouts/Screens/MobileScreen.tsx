import { desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';

const MobileScreen = styled.div`
  ${transition('all')}
  visibility: visible;
  opacity: 1;
  @media (${desktopVp}) {
    visibility: hidden;
    opacity: 0;
  }
`;

export default MobileScreen;

/* display: block; // (0): display 말고 다르게 transition 할 수 있게하기
  @media (${desktopVp}) {
    display: none;
  } */
