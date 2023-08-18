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
  // margin: 1rem 0.5rem 1rem 0.5rem; // trbl
`;
const Category = styled.h1``;
const Content = styled.div`
  margin: 1rem 0 1rem 0;
`;
const Button = styled.button``;
export default Settings;
