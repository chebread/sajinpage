import { FullScreen } from 'layouts/Screens';
import styled from 'styled-components';

const Home = () => {
  return (
    <MainFrame>
      <Container>hello</Container>
    </MainFrame>
  );
};

const Container = styled(FullScreen)``;
const MainFrame = styled.div`
  // main frame
  position: relative;
  height: 100%;
`;

export default Home;
