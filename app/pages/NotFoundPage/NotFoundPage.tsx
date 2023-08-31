import { cssVarsPalette } from 'layouts/cssVars';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Page is not found

const NotFoundPage = () => {
  const navigate = useNavigate();

  const onRedirect = () => {
    navigate('/');
  };

  return (
    <Container>
      <MessageWrapper>
        <Message>죄송합니다. 페이지를 찾을 수 없습니다.</Message>
        <Message>
          클릭하신 링크가 잘못되었거나 페이지가 삭제되었을 수 있습니다.
        </Message>
      </MessageWrapper>
    </Container>
  );
};

const Code = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;
const Message = styled.div`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
`;
const MessageWrapper = styled.div`
  width: 22.5rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Container = styled.div`
  position: relative;
  display: flex;
  margin-top: 2rem;
  justify-content: center;
  height: ${cssVarsPalette.content_full_height};
  width: 100%;
`;

export default NotFoundPage;
