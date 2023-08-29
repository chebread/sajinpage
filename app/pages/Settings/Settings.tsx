import Help from './panels/Help';
import NotFoundPage from 'pages/NotFoundPage';
import Policy from './panels/Policy';
import { useParams, useLocation } from 'react-router-dom';
import About from './panels/About';
import Preferences from './panels/Preferences';
import styled from 'styled-components';
import { desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import DesktopBanner from 'components/Settings/Banner/DesktopBanner';
import MobileBanner from 'components/Settings/Banner/MobileBanner';
import NavigationBanner from 'components/Settings/Banner/NavigationBanner';

const Settings = () => {
  const params = useParams();
  const type = params.type;
  console.log(type);
  const { hash } = useLocation();
  console.log(hash);

  return (
    <>
      <Container>
        {(() => {
          switch (type) {
            case undefined:
              return (
                <>
                  <DesktopBanner />
                  <MobileBanner />
                  <Preferences />
                </>
              );
            case 'a':
              return (
                <>
                  <MobileBanner />
                  <About />
                </>
              );
            case 'h':
              return (
                <>
                  <DesktopBanner />
                  <NavigationBanner />
                  <Help />
                </>
              );
            case 'p':
              return (
                <>
                  <DesktopBanner />
                  <NavigationBanner />
                  <Policy />
                </>
              );
            default:
              return <NotFoundPage />;
          }
        })()}
      </Container>
    </>
  );
};

const Container = styled.div`
  ${transition('all')}
  display: flex;
  height: auto;
  width: 100%;
  flex-direction: column;
  @media (${desktopVp}) {
    flex-direction: row;
    gap: 5rem;
  }
`;

export default Settings;
