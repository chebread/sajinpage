import styled from 'styled-components';

const FullScreen = styled.div<{ position?: string }>`
  /* position: ${({ position }) =>
    position ? position : 'relative'}; // position default value = relative */
  position: relative; // 그냥 자체에서 postion 설정해서 바꾸자
  height: 100%;
  width: 100%; // == 100vw
`;

export default FullScreen;
