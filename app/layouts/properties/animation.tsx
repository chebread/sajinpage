import { css } from 'styled-components';

const animation = (target: string, ...targets: string[]) => {
  return css`
    animation-name: ${target} ${targets.length === 0 ? '' : targets};
    animation-duration: 0.2s;
    animation-timing-function: ease-out;
  `;
};

export default animation;
