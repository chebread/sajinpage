import { cssVarsPalette } from 'layouts/cssVars';
import styled from 'styled-components';

const DropZone = styled.div`
  position: relative;
  height: ${cssVarsPalette.content_full_height};
  width: 100%;
`;

export default DropZone;
