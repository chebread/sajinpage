import { errorAtom } from 'atoms/errorAtom';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

const NotFoundFile = () => {
  const navigate = useNavigate();
  const [error] = useAtom(errorAtom);
  // 이렇게 atom을 불러와서 처리하는 이유는 imagesviewer에서 발생하는 404 코드는 같지만 다른 message를 가진 것 때문에 이렇게 처리를 해야지만, 에러를 사용자에게 올바르게 알릴 수 있음

  return (
    <>
      <h1>{error.code}</h1>
      <div>{error.message}</div>
      <button onClick={() => navigate('/')}>Go home</button>
    </>
  );
};

export default NotFoundFile;

// import { cssVarsPalette } from 'layouts/cssVars';
// import { centerAlign, desktopVp } from 'layouts/properties';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { ReactComponent as WarningIcon } from 'assets/svg/WarningIcon.svg';
// import { ReactComponent as HomeIcon } from 'assets/svg/HomeIcon.svg';
// import transition from 'layouts/properties/transition';
// import BottomButton from 'components/BottomButton';
// import { useAtom } from 'jotai';
// import { errorAtom } from 'atoms/errorAtom';

// // Page is not found

// const NotFoundFile = () => {
//   const navigate = useNavigate();
//   const [error] = useAtom(errorAtom);

//   const onRedirect = () => {
//     navigate('/');
//   };

//   return (
//     <Container>
//       <Wrapper>
//         <IconWrapper onClick={onRedirect}>
//           <WarningIcon />
//         </IconWrapper>
//         <MessageWrapper>
//           <Message>{error.message}</Message>
//         </MessageWrapper>
//       </Wrapper>
//       <BottomButton onClick={onRedirect}>
//         <HomeIcon />
//       </BottomButton>
//     </Container>
//   );
// };

// const Container = styled.div`
//   position: relative;
//   ${transition('height', 'width')}
//   height: ${cssVarsPalette.mobile_content_full_height};
//   @media (${desktopVp}) {
//     height: ${cssVarsPalette.desktop_content_full_height};
//   }
//   width: 100%;
// `;

// const Wrapper = styled.div`
//   position: absolute;
//   height: 100%;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   ${centerAlign}
// `;
// const IconWrapper = styled.div`
//   svg {
//     cursor: pointer;
//     ${transition('transform', 'height', 'width')}
//     height: 10rem; //
//     @media (${desktopVp}) {
//       height: 10rem;
//     }
//     &:hover {
//       transform: scale(1.07);
//     }
//     &:active {
//       transform: scale(0.98);
//     }
//   }
// `;
// const MessageWrapper = styled.div`
//   margin: 1rem; //
// `;
// const Message = styled.div`
//   ${transition('all')}
//   font-size: 1.5rem; //
//   @media (${desktopVp}) {
//     font-size: 1.5rem;
//   }
// `;

// export default NotFoundFile;
