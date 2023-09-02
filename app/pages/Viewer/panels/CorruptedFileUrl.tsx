import { cssVarsPalette } from 'layouts/cssVars';
import { desktopVp, transition } from 'layouts/properties';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// file 로드 중 이미지에 손상이 있을때 (이미지 url을 불러오지 못할때)

const CorruptedFileUrl = () => {
  const navigate = useNavigate();

  const onRefresh = () => {
    navigate(0);
  };
  return (
    <Container>
      <Wrapper>
        <Message>파일 로드 중 알 수 없는 에러가 발생하였습니다.</Message>
        <Sub>
          파일이 손상되었거나 브라우저가 파일의 형식을 지원하지 않을 수
          있습니다.
        </Sub>
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

export default CorruptedFileUrl;
