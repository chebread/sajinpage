import { ReactComponent as Logo } from 'assets/svg/Logo.svg';
import { desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import { CenterScreen } from 'layouts/screens';
import { themeVars } from 'layouts/themes';
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
  z-index: 1000000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${themeVars.light.background_color};
  svg {
    ${transition('height')}
    width: 5.5rem;
    height: 5.5rem;
    @media (${desktopVp}) {
      width: 7.5rem;
      height: 7.5rem;
    }
    fill: ${themeVars.light.logo_color};
  }
`;

export default PageLoading;
