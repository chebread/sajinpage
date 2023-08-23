import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as HelpIcon } from 'assets/svg/HelpIcon.svg';
import { ReactComponent as PolicyIcon } from 'assets/svg/PolicyIcon.svg';
import transition from 'layouts/properties/transition';
import { desktopVp, disableTab } from 'layouts/properties';
import { cssVarsPalette } from 'layouts/cssVars';
import NotFoundPage from 'pages/NotFoundPage';
import { useEffect } from 'react';

// this page provide only mobile

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth >= 961) {
      navigate('/s'); // desktop에서는 /s로 리다이렉트 됩니다
    }
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const onResize = () => {
    if (window.innerWidth >= 961) {
      navigate('/s');
    }
  };

  return (
    <>
      <DesktopContainer>
        <NotFoundPage />
      </DesktopContainer>
      <MobileContainer>
        <NavigateWrapper>
          <Navigate to="/s/h" end>
            <HelpIcon />
            도움말
          </Navigate>
          <Navigate to="/s/p" end>
            <PolicyIcon />
            서비스 정책
          </Navigate>
        </NavigateWrapper>
      </MobileContainer>
    </>
  );
};

const NavigateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
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
    fill: #000;
  }
`;
const MobileContainer = styled.div`
  display: block;
  @media (${desktopVp}) {
    display: none;
  }
  height: 100%;
  width: auto;
  margin-bottom: ${cssVarsPalette.nav_height};
  padding: 2rem 1rem 2rem 1rem;
`;
const DesktopContainer = styled.div`
  // 리다이렉트가 안될 경우를 대비해서 404 페이지 준비함
  display: none;
  @media (${desktopVp}) {
    display: block;
  }
`;

export default About;
