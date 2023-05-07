import { CenterAlign } from 'layouts/properties';
import styled from 'styled-components';
import FullScreen from './FullScreen';

const CenterScreen = styled(FullScreen)`
  display: flex;
  flex-direction: column;
  ${CenterAlign}
`;

export default CenterScreen;
