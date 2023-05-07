import styled from 'styled-components';
import FullScreen from './FullScreen';

const BottomScreen = styled(FullScreen)`
  position: absolute;
  height: 100%;
  width: 100%;
  // alignment
  display: flex;
  flex-direction: column; // (*)
  justify-content: flex-end;
  align-items: center;
`;

export default BottomScreen;
