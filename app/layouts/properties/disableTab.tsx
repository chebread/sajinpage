import { css } from 'styled-components';

// mobile에서 기본적으로 클릭시 나오는 background-color를 초기화함
const disableTab = css`
  -webkit-tap-highlight-color: transparent; // non-standard
  user-select: none;
  -webkit-touch-callout: none; // non-standard
`;

export default disableTab;
