import { css } from 'styled-components';

// (bug): styles 인수의 CSS String Literal Type과 DesktopScreen의 인수를 보낼때 자동으로 css`` 처리가 되게 하기
const DesktopScreen = styles => css`
  @media (min-width: 1024px) {
    ${styles}
  }
`;

export default DesktopScreen;
