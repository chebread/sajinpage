import { cssVarsPalette } from 'layouts/cssVars';
import { desktopVp, transition } from 'layouts/properties';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 웹사이트 접근 금지되었을때 => IE or IDB 사용 불가

const ForbiddenPage = ({ message }) => {
  const navigate = useNavigate();

  const onRefresh = () => {
    navigate(0);
  };
  return (
    <Container>
      <Wrapper>
        <Message>사진페이지를 사용할 수 없습니다.</Message>
        <Sub>{message}</Sub>
        <RefreshBtn onClick={onRefresh}>새로고침 하기</RefreshBtn>
      </Wrapper>
    </Container>
  );
};

const RefreshBtn = styled.button`
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
  margin: 2rem 1rem 2rem 1rem;
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
`;

export default ForbiddenPage;
