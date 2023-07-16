import { css } from 'styled-components';

const disabledScrollbar = css`
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export default disabledScrollbar;
