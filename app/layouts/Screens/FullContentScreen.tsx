import { cssVarsPalette } from 'layouts/cssVars';
import { desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';

const FullContentScreen = styled.div<{ position?: string }>`
  position: relative;
  // animation
  ${transition('height', 'width')}
  height: ${cssVarsPalette.mobile_content_full_height};
  @media (${desktopVp}) {
    height: ${cssVarsPalette.desktop_content_full_height};
  }
  width: 100%;
`;

export default FullContentScreen;
