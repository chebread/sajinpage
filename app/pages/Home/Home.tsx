import { cssVarsPalette } from 'layouts/cssVars';
import styled from 'styled-components';
import { desktopVp, transition } from 'layouts/properties';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <Wrapper>
        <Message>반갑습니다. 사진페이지입니다.</Message>
        <Sub>링크로 사진을 자유롭게 공유하고 저장해보세요.</Sub>
        <Redirect to="u">파일 업로드 하기</Redirect>
      </Wrapper>
    </Container>
  );
};

const Redirect = styled(Link)`
  all: unset;
  ${transition('all')}
  cursor: pointer;
  font-size: 0.9rem;
  height: 34px;
  font-weight: 600;
  padding: 0 1rem 0 1rem;
  border: rgba(0, 0, 0, 0.15) solid 1px;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:active {
    transform: scale(0.85);
    @media (${desktopVp}) {
      transform: scale(0.93);
    }
  }
`;
const Sub = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
  color: #999999;
  text-align: center;
  margin-bottom: 1rem;
`;
const Message = styled.div`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1rem;
`;
const Wrapper = styled.div`
  width: 22.5rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: ${cssVarsPalette.content_full_height};
  width: 100%;
  margin-top: 2rem;
`;

export default Home;
