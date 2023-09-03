import {
  centerAlign,
  desktopVp,
  disableSelection,
  disableTab,
  landscapeVp,
} from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { ReactComponent as SmallLeftArrow } from 'assets/svg/SmallLeftArrow.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { cssVarsPalette } from 'layouts/cssVars';

// (0): blur가 header에도 있어서 약간 이중 blur로 되는 것 twitter 참고하여 이거 없에기

const NavigationBanner = () => {
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
          <SmallLeftArrow />
        </Button>
      </Back>
      <Navigator>
        {(() => {
          switch (type) {
            case 'f':
              return '피드백 및 문의';
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
    /* background-color: rgb(220, 220, 220); */
    background-color: rgb(235, 235, 235);
    transform: scale(0.85);
  }
  height: 2rem;
  width: 2rem;
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  svg {
    ${transition('all')}
    height: 1.5rem;
  }
`;
const Back = styled.div`
  height: 3rem;
  width: 3rem;
  display: flex;
  ${centerAlign}
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
  position: fixed;
  /* background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(1rem); */
  background-color: #fff;
  height: 3rem;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
  @media (${landscapeVp}) {
    padding-left: ${cssVarsPalette.sal};
    padding-right: ${cssVarsPalette.sar};
  }
`;
export default NavigationBanner;
