import {
  centerAlign,
  desktopVp,
  disableSelection,
  disableTab,
} from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { ReactComponent as LeftArrow } from 'assets/svg/LeftArrow.svg';
import { useNavigate, useParams } from 'react-router-dom';

const NavigatorBanner = () => {
  const params = useParams();
  const navigate = useNavigate();
  const type = params.type;

  const onRedirect = () => {
    // ios safari에서 /s/a 페이지가 100% 스크롤을 넘어서 이상하게 보이는 문제 때문에 리다이렉트 전에 페이지의 최상단 이동후 리다이렉트됨
    const win = window as Window;
    win.scrollTo(0, 0);
    navigate('/s/a');
  };

  return (
    <Container>
      <Back>
        <Button onClick={onRedirect}>
          <LeftArrow />
        </Button>
      </Back>
      <Navigator>
        {(() => {
          switch (type) {
            case 'h':
              return '도움말';
            case 'p':
              return '서비스 정책';
            default:
              return null;
          }
        })()}
      </Navigator>
    </Container>
  );
};

const Button = styled.button`
  all: unset;
  cursor: pointer;
  ${disableTab}
  ${transition('all')}
  &:active {
    background-color: rgb(220, 220, 220);
    transform: scale(0.85);
  }
  height: 2rem;
  width: 2rem;
  display: flex;
  ${centerAlign}
  border-radius: 50%;
`;
const Back = styled.div`
  all: unset;
  height: 3rem;
  width: 3rem;
  display: flex;
  ${centerAlign}
  svg {
    ${transition('all')}
    height: 1.5rem;
  }
`;
const Navigator = styled.div`
  ${disableSelection}
  width: auto;
  height: auto;
  display: flex;
  ${centerAlign}
  font-size: 1.3rem;
  line-height: 2rem;
`;
const Container = styled.div`
  ${transition('all')}
  display: flex;
  @media (${desktopVp}) {
    display: none;
  }
  top: 3rem;
  position: sticky;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  height: 3rem;
  width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
`;
export default NavigatorBanner;
