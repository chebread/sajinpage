import { cssVarsPalette } from 'layouts/cssVars';
import { desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import Navigator from 'components/Navigator';

// (0): desktop 용이기에 mobile 대응 제거하기

const ViewerNavigator = () => {
  return (
    <NavigatorWrapper>
      <Navigator />
    </NavigatorWrapper>
  );
};

const NavigatorWrapper = styled.div`
  ${transition('all')}
  transform: translateY(100%);
  @media (${desktopVp}) {
    transform: translateY(0);
  }
  position: fixed;
  height: ${cssVarsPalette.nav_height};
  width: 100%;
  bottom: 0;
`;

export default ViewerNavigator;
