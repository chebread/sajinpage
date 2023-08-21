import SettingsBanner from 'components/Settings/SettingsBanner';
import Help from './panels/Help';
import NotFoundPage from 'pages/NotFoundPage';
import Policy from './panels/Policy';
import { useParams } from 'react-router-dom';
import About from './panels/About';
import Preferences from './panels/Preferences';
import styled from 'styled-components';
import { cssVarsPalette } from 'layouts/cssVars';
import { desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';

const Settings = () => {
  const params = useParams();
  const type = params.type;
  console.log(type);

  return (
    <>
      <Container>
        {(() => {
          switch (type) {
            case undefined:
              return (
                <>
                  <SettingsBanner />
                  <Preferences />
                </>
              );
            case 'a':
              return (
                <>
                  <SettingsBanner />
                  <About />
                </>
              );
            case 'h':
              return (
                <>
                  <SettingsBanner />
                  <Help />
                </>
              );
            case 'p':
              return (
                <>
                  <SettingsBanner />
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
  height: ${cssVarsPalette.content_full_height};
  width: 100%;
  display: flex;
  gap: 80px;
  flex-direction: column;
  @media (${desktopVp}) {
    flex-direction: row;
  }
`;

export default Settings;
