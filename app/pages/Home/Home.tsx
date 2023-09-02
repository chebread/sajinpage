import { cssVarsPalette } from 'layouts/cssVars';
import styled from 'styled-components';

const Home = () => {
  return <Container></Container>;
};

const Container = styled.div`
  height: ${cssVarsPalette.content_full_height};
  width: auto;
  padding: 2rem 1rem 2rem 1rem;
`;

export default Home;
