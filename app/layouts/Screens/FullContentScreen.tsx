import { cssVarsPalette } from 'layouts/cssVars';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';

const FullContentScreen = styled.div`
  position: relative;
  ${transition('height', 'width')}
  height: ${cssVarsPalette.content_full_height};
  width: 100%;
`;

export default FullContentScreen;
