import { desktopVp } from 'layouts/properties';
import styled from 'styled-components';

const MobileScreen = styled.div`
  display: block; // (0): display 말고 다르게 transition 할 수 있게하기
  @media (${desktopVp}) {
    display: none;
  }
`;

export default MobileScreen;
