import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as HelpIcon } from 'assets/svg/HelpIcon.svg';
import { ReactComponent as PolicyIcon } from 'assets/svg/PolicyIcon.svg';
import transition from 'layouts/properties/transition';
import { desktopVp, disableTab, landscapeVp } from 'layouts/properties';
import { cssVarsPalette } from 'layouts/cssVars';
import DesktopBanner from 'components/Settings/Banner/DesktopBanner';
import Preferences from '../Preferences';

// this page provide only mobile
// desktop에서는 s/ 페이지와 동일시하게 보여주기

const About = () => {
  return (
    <>
      <DesktopContainer>
        <DesktopBanner />
        <Preferences />
      </DesktopContainer>
      <Container>
        <Navigate to="/s/h" end>
          <HelpIcon />
          도움말
        </Navigate>
        <Navigate to="/s/p" end>
          <PolicyIcon />
          서비스 정책
        </Navigate>
      </Container>
    </>
  );
};

const Navigate = styled(NavLink)`
  all: unset;
  ${disableTab}
  ${transition('all')}
  cursor: pointer;
  width: auto;
  padding: 1.5rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  @media (${desktopVp}) {
    font-size: 1rem;
  }
  font-weight: 500;
  background-color: rgb(245, 245, 245);
  &:active {
    background-color: rgb(220, 220, 220);
    transform: scale(0.98);
  }
  svg {
    height: 1.5rem;
    fill: #1969d2;
  }
`;
const Container = styled.div`
  @media (${desktopVp}) {
    display: none;
  }
  height: 100%;
  width: auto;
  margin-bottom: ${cssVarsPalette.nav_height};
  padding: 2rem 1rem 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (${landscapeVp}) {
    padding-left: calc(1rem + env(safe-area-inset-left));
    padding-right: calc(1rem + env(safe-area-inset-right));
    padding-left: calc(1rem + constant(safe-area-inset-left));
    padding-right: calc(1rem + constant(safe-area-inset-right));
  }
`;
const DesktopContainer = styled.div`
  display: none;
  @media (${desktopVp}) {
    display: flex;
    height: auto;
    width: 100%;
    flex-direction: row;
    gap: 5rem;
  }
`;

export default About;

// const navigate = useNavigate();

//   useEffect(() => {
//     if (window.innerWidth >= 961) {
//       navigate('/s'); // desktop에서는 /s로 리다이렉트 됩니다
//     }
//     window.addEventListener('resize', onResize);
//     return () => {
//       window.removeEventListener('resize', onResize);
//     };
//   }, []);

//   const onResize = () => {
//     if (window.innerWidth >= 961) {
//       navigate('/s');
//     }
//   };
