import { desktopVp } from 'layouts/properties';
import mobileVp from 'layouts/properties/mobileVp';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';

const DesktopScreen = styled.div`
  ${transition('all')}
  position:absolute;
  opacity: 0;
  @media (${desktopVp}) {
    position: static;
    opacity: 1;
  }
`;

export default DesktopScreen;

// ${transition('all')}
//   @media (${mobileVp}) {
//     ${transition('all')}
//     visibility: hidden;
//     overflow: hidden;
//     width: 0;
//     height: 0;
//     margin: 0;
//     padding: 0;
//   }
//   @media (${desktopVp}) {
//     ${transition('all')}
//     visibility: visible;
//   }
