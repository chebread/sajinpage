import { errorAtom } from 'atoms/errorAtom';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DeletedFile = () => {
  const navigate = useNavigate();
  const [error] = useAtom(errorAtom);

  return (
    <Container>
      <div>{error.code}</div>
      <div>{error.message}</div>
      <button onClick={() => navigate('/')}>Go home</button>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export default DeletedFile;
