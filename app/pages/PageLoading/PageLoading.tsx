import { ReactComponent as Logo } from 'assets/svg/Logo.svg';
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
    // animation
    transition: height;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
    // mobile
    height: 12%; // 100px
    // desktop
    @media (min-width: 960px) {
      height: 17%; // 140px
    }
    fill: #000000;
  }
`;

export default PageLoading;
