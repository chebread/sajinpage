import { linkUploaderClickedAtom } from 'atoms/uploaderAtom';
import { useAtom } from 'jotai';
import { desktopVp, disableTab, transition } from 'layouts/properties';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MobileUploader = ({ open, onDropUrl }) => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useAtom(linkUploaderClickedAtom);

  const onBack = () => {
    navigate(-1);
    setClicked(false);
  };
  const onEnter = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onDropUrl(e.target.value);
    }
  };
  const toggleClicked = () => {
    setClicked(!clicked);
  };

  return (
    <Container>
      <Wrapper>
        {clicked ? (
          <>
            <Input
              type="text"
              placeholder="복사한 파일 링크를 붙여넣어 주세요."
              onKeyUp={onEnter}
            />
            <Button onClick={toggleClicked}>취소</Button>
          </>
        ) : (
          <>
            <Button onClick={open}>파일 업로드</Button>
            <Button onClick={toggleClicked}>파일 링크 업로드</Button>
            <Button onClick={onBack}>취소</Button>
          </>
        )}
      </Wrapper>
      <Background onClick={onBack} />
    </Container>
  );
};

const Input = styled.input`
  all: unset;
  ${disableTab}
  ${transition('all')}
  cursor: pointer;
  padding: 1.25rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: rgb(245, 245, 245);
  &::placeholder {
    color: #70757a;
  }
`;
const Button = styled.button`
  all: unset;
  ${disableTab}
  ${transition('all')}
  cursor: pointer;
  padding: 1.25rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: rgb(245, 245, 245);
  &:active {
    background-color: rgb(235, 235, 235);
    transform: scale(0.98);
  }
`;
const Wrapper = styled.div`
  position: fixed;
  height: auto;
  width: 100%;
  background-color: #fff;
  z-index: 100000;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  box-sizing: border-box;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;
const Background = styled.div`
  ${transition('all')}
  visibility: visible;
  opacity: 1;
  z-index: 10000;
  @media (${desktopVp}) {
    visibility: hidden;
    opacity: 0;
    z-index: -1;
  }
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
const Container = styled.div`
  visibility: visible;
  opacity: 1;
  z-index: 0;
  @media (${desktopVp}) {
    visibility: hidden;
    opacity: 0;
    z-index: -1;
  }
  height: 100%;
  width: 100%;
`;

export default MobileUploader;
