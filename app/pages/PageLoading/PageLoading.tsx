import { ReactComponent as Logo } from 'assets/svg/Logo.svg';
import { desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import { CenterScreen } from 'layouts/screens';
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
  background-color: #ffffff; // (0): 이것을 왜 해야할까
  svg {
    ${transition('height')}
    height: 5.5rem; // 12%
    @media (${desktopVp}) {
      height: 7.5rem; // 17% // 8rem
    }
  }
`;

export default PageLoading;
