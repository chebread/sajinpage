import { cssVarsPalette } from 'layouts/cssVars';
import { desktopVp } from 'layouts/properties';
import styled from 'styled-components';

// (0): 도움말은 Squoosh 처럼 제공하기, 에니메이션은 네이버 활용백서 같이 구성하기

const Help = () => {
  return <Container></Container>;
};

const Container = styled.div`
  height: auto;
  width: auto;
  margin-top: ${cssVarsPalette.nav_height}; // for mobile banner
  margin-bottom: ${cssVarsPalette.nav_height};
  margin-bottom: calc(${cssVarsPalette.nav_height} + ${cssVarsPalette.sab});
  padding: 2rem 1rem 2rem 1rem;
  @media (${desktopVp}) {
    margin-top: 0;
  }
`;

export default Help;
