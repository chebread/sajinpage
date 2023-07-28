import { cssVarsPalette } from 'layouts/cssVars';
import { centerAlign, desktopVp } from 'layouts/properties';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as WarningIcon } from 'assets/svg/WarningIcon.svg';
import { ReactComponent as HomeIcon } from 'assets/svg/HomeIcon.svg';
import transition from 'layouts/properties/transition';
import BottomButton from 'components/BottomButton';

// Page is not found

const NotFoundPage = () => {
  const navigate = useNavigate();

  const onRedirect = () => {
    navigate('/');
  };

  return (
    <Container>
      <h1>404</h1>
      <div>This page is not found</div>
      <button onClick={onRedirect}>Go home</button>
      {/* <Wrapper>
       <IconWrapper onClick={onRedirect}>
          <WarningIcon />
        </IconWrapper>
        <MessageWrapper>
          <Message>Page is not found</Message>
        </MessageWrapper>
      </Wrapper>
      <BottomButton onClick={onRedirect}>
        <HomeIcon />
      </BottomButton> */}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  ${transition('height', 'width')}
  height: ${cssVarsPalette.mobile_content_full_height};
  @media (${desktopVp}) {
    height: ${cssVarsPalette.desktop_content_full_height};
  }
  width: 100%;
`;

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  ${centerAlign}
`;
const IconWrapper = styled.div`
  svg {
    cursor: pointer;
    ${transition('transform', 'height', 'width')}
    height: 5.5rem; //
    @media (${desktopVp}) {
      height: 7.5rem;
    }
    &:hover {
      transform: scale(1.07);
    }
    &:active {
      transform: scale(0.98);
    }
  }
`;
const MessageWrapper = styled.div`
  margin: 1rem; //
`;
const Message = styled.div`
  ${transition('all')}
  font-size: 20px; //
  @media (${desktopVp}) {
    font-size: 24px;
  }
  /* &:hover {
    transform: scale(1.07);
  }
  &:active {
    transform: scale(0.98);
  } */
`;

export default NotFoundPage;
