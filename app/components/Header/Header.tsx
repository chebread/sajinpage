import { RelativePos } from 'layouts/properties';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// redirect시 atom value 초기화는 필요 없음
// (0): / 일때는 uploader 버튼이 색상이 있으며 /f 일때는 myfiles 버튼이 색상이 있다 (thisishaneum v2 같이 한다)
// (0): 해더를 뺀 full screen layout 추가하기

const Header = () => {
  const navigate = useNavigate();

  const onRedict = (e: any) => {
    const {
      target: { value },
    } = e;
    navigate(value);
    // (0): 이거할때도 init atom values 하기
  };

  return (
    <Container>
      <button onClick={onRedict} value="/">
        Sajin
      </button>
      <button onClick={onRedict} value="/">
        Uploader
      </button>
      <button onClick={onRedict} value="/f">
        My files
      </button>
      <hr />
    </Container>
  );
};

const Container = styled.div`
  ${RelativePos}
`;
export default Header;
