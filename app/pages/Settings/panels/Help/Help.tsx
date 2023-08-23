import { cssVarsPalette } from 'layouts/cssVars';
import { desktopVp } from 'layouts/properties';
import styled from 'styled-components';

// (0): 도움말은 Squoosh 처럼 제공하기, 에니메이션은 네이버 활용백서 같이 구성하기

const Help = () => {
  return (
    <Container>
      <Text>
        문의는 <A href="mailto:chahanm@proton.me">chahanm@proton.me</A>로
        부탁드립니다.
      </Text>
    </Container>
  );
};

const A = styled.a`
  all: unset;
  transition: all;
  transition-duration: 0.1s;
  transition-timing-function: ease-out;
  @media (${desktopVp}) {
    &:hover {
      color: #1969d2;
    }
  }
  &:active {
    color: #1969d2;
  }
`;
const Text = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;
const Container = styled.div`
  height: auto;
  width: auto;
  margin-bottom: ${cssVarsPalette.nav_height};
  padding: 2rem 1rem 2rem 1rem;
`;

export default Help;
