import { desktopVp } from 'layouts/properties';
import mobileVp from 'layouts/properties/mobileVp';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';

// 이것의 용도는 그냥 요소 삭제되고 그것의 용도임

const DesktopScreen = styled.div`
  ${transition('all')}
  visibility: hidden;
  opacity: 0;
  @media (${desktopVp}) {
    visibility: visible;
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
