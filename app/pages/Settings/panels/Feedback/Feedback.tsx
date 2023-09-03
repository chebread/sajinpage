import { cssVarsPalette } from 'layouts/cssVars';
import {
  desktopVp,
  disableTab,
  landscapeVp,
  transition,
} from 'layouts/properties';
import styled from 'styled-components';
import { ReactComponent as AskIcon } from 'assets/svg/AskIcon.svg';

// (0): 도움말은 Squoosh 처럼 제공하기, 에니메이션은 네이버 활용백서 같이 구성하기

const Feedback = () => {
  return (
    <Container>
      <Category>피드백 및 문의</Category>
      <Description>
        피드백 및 지원 관련 문의는 아래의 링크에서 부탁드립니다.
      </Description>
      <ButtonWrapper>
        <Button
          href="https://sajinpage.canny.io/feedback"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <AskIcon />
          피드백 및 문의하기
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  gap: 0.5rem;
`;
const Button = styled.a`
  all: unset;
  ${disableTab}
  ${transition('all')}
  cursor: pointer;
  width: auto;
  padding: 1.5rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  @media (${desktopVp}) {
    font-size: 1rem;
  }
  font-weight: 500;
  background-color: rgb(245, 245, 245);
  @media (${desktopVp}) {
    &:hover {
      /* background-color: rgb(235, 235, 235); */
    }
  }
  &:active {
    background-color: rgb(235, 235, 235);
    transform: scale(0.98);
  }
  svg {
    height: 1.5rem;
    fill: #1969d2;
  }
`;
const Description = styled.div`
  font-size: 0.9rem;
  @media (${desktopVp}) {
    font-size: 1rem;
  }
  font-weight: 400;
  padding-bottom: 1rem;
`;
const Category = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  @media (${desktopVp}) {
    font-weight: 500;
    font-size: 2rem;
  }
  padding-bottom: 1rem;
  &:not(:first-child) {
    padding-top: 2rem;
  }
`;
const Container = styled.div`
  position: relative;
  height: 100%;
  width: auto;
  @media (${desktopVp}) {
    width: 40rem;
  }
  margin-top: ${cssVarsPalette.header_height};
  margin-bottom: ${cssVarsPalette.nav_height};
  margin-bottom: calc(${cssVarsPalette.nav_height} + ${cssVarsPalette.sab});
  @media (${desktopVp}) {
    margin-top: 0;
  }
  padding: 2rem 1rem 2rem 1rem;
  @media (${landscapeVp}) {
    padding-left: calc(1rem + ${cssVarsPalette.sal});
    padding-right: calc(1rem + ${cssVarsPalette.sar});
  }
`;

export default Feedback;
