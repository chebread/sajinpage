import { ReactComponent as Logo } from 'assets/svg/Logo.svg';
import { darkMode, desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import { CenterScreen } from 'layouts/screens';
import { themedPalette, themeVars } from 'layouts/themes';
import styled from 'styled-components';

const PageLoading = () => {
  return (
    <Container>
      <Logo />
    </Container>
  );
};

const Container = styled(CenterScreen)`
  position: fixed;
  z-index: 10000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  // (0): 이것을 왜 해야할까
  background-color: ${themeVars.light.background_color};
  svg {
    ${transition('height')}
    height: 5.5rem; // 12%
    fill: ${themeVars.light.loading_logo_fill};
    @media (${desktopVp}) {
      height: 7.5rem; // 17% // 8rem
    }
  }
`;

export default PageLoading;

/*
rgb(50, 50, 255)
rgb(0, 50, 255)
rgb(0, 20, 255)
rgb(20, 70, 255)
rgb(0, 50, 200);
rgb(0, 70, 200)
rgb(255, 175, 185)

#0046c8
*/
