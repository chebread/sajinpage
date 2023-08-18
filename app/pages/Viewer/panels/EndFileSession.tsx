import { errorAtom } from 'atoms/errorAtom';
import fileDbAtom from 'atoms/fileDbAtom';
import onDelete from 'components/Viewer/onDelete';
import { useAtom } from 'jotai';
import { cssVarsPalette } from 'layouts/cssVars';
import styled from 'styled-components';

// 파일 삭제할수 있는 버튼을 최대로 키우기
const EndFileSession = () => {
  const [error] = useAtom(errorAtom);
  const [fileDb] = useAtom(fileDbAtom);

  return (
    <Container>
      <div>{error.code}</div>
      <div>{error.message}</div>
      <div>
        <button onClick={() => onDelete(fileDb.docId)}>Delete</button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: ${cssVarsPalette.content_full_height};
  top: 0;
  width: 100%;
  background-color: red;
`;

export default EndFileSession;
