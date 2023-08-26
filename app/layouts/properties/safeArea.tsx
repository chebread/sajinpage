import { css } from 'styled-components';
import landscapeVp from './landscapeVp';

// this padding is for Iphone notch

const safeArea = css`
  @media (${landscapeVp}) {
    padding-left: calc(1rem + env(safe-area-inset-left));
    padding-right: calc(1rem + env(safe-area-inset-right));
    padding-left: calc(1rem + constant(safe-area-inset-left));
    padding-right: calc(1rem + constant(safe-area-inset-right));
  }
`;

export default safeArea;
