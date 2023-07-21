import styled from 'styled-components';
import FullScreen from './fullScreen';

const bottomScreen = styled(FullScreen)`
  position: absolute;
  height: 100%;
  width: 100%;
  // alignment
  display: flex;
  flex-direction: column; // (*)
  justify-content: flex-end;
  align-items: center;
`;

export default bottomScreen;
