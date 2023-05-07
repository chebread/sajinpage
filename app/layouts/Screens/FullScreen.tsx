import styled from 'styled-components';

const FullScreen = styled.div<{ position?: string }>`
  position: ${({ position }) =>
    position ? position : 'relative'}; // position default value = relative
  height: 100%;
  width: 100vw; // == 100%
`;

export default FullScreen;
