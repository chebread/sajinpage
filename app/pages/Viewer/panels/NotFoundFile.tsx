import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp, transition } from 'layouts/properties';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundFile = () => {
  return (
    <Container>
      <Wrapper>
        <Message>파일을 찾을 수 없습니다.</Message>
        <Sub>파일 링크가 잘못되었거나 파일이 삭제되었을 수 있습니다.</Sub>
        <Redirect to="/">홈으로 가기</Redirect>
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

export default NotFoundFile;
