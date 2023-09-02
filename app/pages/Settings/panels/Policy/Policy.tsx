import { cssVarsPalette } from 'layouts/cssVars';
import { desktopVp, landscapeVp } from 'layouts/properties';
import styled from 'styled-components';

const Policy = () => {
  return (
    <Container>
      <Category>서비스 이용약관</Category>
      <Wrapper>
        <Title>목적</Title>
        <Content>
          본 약관은 회원(본 약관에 동의한 자를 말하며 이하 "회원"이라고
          합니다)이 사진페이지(이하 "회사"라고 합니다)가 제공하는 서비스를
          이용함에 있어 회사와 회원의 권리 의무 및 책임사항을 규정함을 목적으로
          합니다.
        </Content>
      </Wrapper>
      <Category>개인정보 취급 방침</Category>
      <Wrapper>
        <Title>개인정보의 수집 및 이용 목적</Title>
        <Content>
          사진페이지(이하 "회사")는 수집한 개인정보를 서비스 제공의 목적을 위해
          활용합니다.
        </Content>
      </Wrapper>
    </Container>
  );
};

const Content = styled.div`
  font-size: 0.9rem;
  @media (${desktopVp}) {
    font-size: 1rem;
  }
  line-height: 1.7rem;
  font-weight: 400;
  /* word-break: keep-all;
  overflow-wrap: break-word; */
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;
const Title = styled.div`
  font-size: 1.3rem;
  @media (${desktopVp}) {
    font-size: 1.5rem;
  }
  font-weight: 500;
  padding-bottom: 1.5rem;
  &:not(:first-child) {
    padding-top: 0.5rem;
  }
`;
const Wrapper = styled.div`
  // for first-child
`;
const Category = styled.div`
  font-size: 1.5rem;
  @media (${desktopVp}) {
    font-size: 2rem;
  }
  font-weight: 600;
  @media (${desktopVp}) {
    font-weight: 500; // 변환시 transition animation은 사용하지 않음
  }
  padding-bottom: 2rem;
  &:not(:first-child) {
    padding-top: 2rem;
  }
`;
const Container = styled.div`
  height: 100%;
  width: auto;
  margin-top: ${cssVarsPalette.nav_height}; // for mobile banner
  margin-bottom: ${cssVarsPalette.nav_height};
  margin-bottom: calc(${cssVarsPalette.nav_height} + ${cssVarsPalette.sab});
  padding: 2rem 1rem 2rem 1rem;
  @media (${desktopVp}) {
    width: 40rem;

    margin-top: 0;
  }
  @media (${landscapeVp}) {
    padding-left: calc(1rem + ${cssVarsPalette.sal});
    padding-right: calc(1rem + ${cssVarsPalette.sar});
  }
`;

export default Policy;
