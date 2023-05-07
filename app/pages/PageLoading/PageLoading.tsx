import { ReactComponent as Logo } from 'assets/svg/Logo.svg';
import { CenterScreen } from 'layouts/Screens';
import styled from 'styled-components';

const PageLoading = () => {
  return (
    <Container>
      <Logo />
    </Container>
  );
};

const Container = styled(CenterScreen)`
  svg {
    height: 20%;
    fill: #000;
  }
`;

export default PageLoading;
