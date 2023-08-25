import { cssVarsPalette } from 'layouts/cssVars';
import styled from 'styled-components';

// (0): 도움말은 Squoosh 처럼 제공하기, 에니메이션은 네이버 활용백서 같이 구성하기

const Help = () => {
  return <Container></Container>;
};

const Container = styled.div`
  height: auto;
  width: auto;
  margin-bottom: ${cssVarsPalette.nav_height};
  padding: 2rem 1rem 2rem 1rem;
`;

export default Help;
