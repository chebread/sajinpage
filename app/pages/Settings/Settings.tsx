import onClearDb from 'components/Settings/onClearDb';
import { cssVarsPalette } from 'layouts/cssVars';
import { desktopVp } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';

const Settings = () => {
  return (
    <Container>
      <Category>Settings</Category>
      <Content>
        <Button onClick={onClearDb}>Clear my files's datas</Button>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: calc(100% - 8rem);
  margin: 1rem 0.5rem 1rem 0.5rem; // trbl
  background-image: url(https://careers.twitter.com/content/dam/careers-twitter/careers-redesign-2021/interior-page-bg.jpg.twimg.1920.jpg);
`;
const Category = styled.div`
  ${transition('all')}
  font-weight: 700;
  font-size: 1.5rem;
  @media (${desktopVp}) {
    font-size: 2rem;
  }
`;
const Content = styled.div`
  margin: 1rem 0 1rem 0;
`;
const Button = styled.button`
  all: unset;
  font-size: 1.2rem;
  border-radius: 0.5;
  padding: 0.5rem;
  background-color: rgb(235, 235, 235);
`;
export default Settings;
