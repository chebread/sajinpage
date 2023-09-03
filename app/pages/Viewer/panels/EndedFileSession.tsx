import fileDbAtom from 'atoms/fileDbAtom';
import onDeleteFile from 'components/onDeleteFile';
import { useAtom } from 'jotai';
import { cssVarsPalette } from 'layouts/cssVars';
import { desktopVp, transition } from 'layouts/properties';
import styled from 'styled-components';

// 파일 삭제할수 있는 버튼을 최대로 키우기
const EndedFileSession = () => {
  const [fileDb] = useAtom(fileDbAtom);

  return (
    <Container>
      <Wrapper>
        <Message>파일 세션이 종료되었습니다.</Message>
        <Sub>
          파일의 제한모드 설정시 설정한 시간이 초과되어 파일의 세션이
          종료되었습니다.
        </Sub>
        <DeleteBtn onClick={() => onDeleteFile(fileDb.docId)}>
          삭제하기
        </DeleteBtn>
      </Wrapper>
    </Container>
  );
};

const DeleteBtn = styled.button`
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

export default EndedFileSession;
