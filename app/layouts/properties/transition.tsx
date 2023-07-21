import { css } from 'styled-components';

const transition = (target: string, ...targets: string[]) => {
  return css`
    transition: ${target} ${targets.length === 0 ? '' : targets};
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
  `;
};

export default transition;
