import Router from 'components/Router/Router';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';

// toast 및 router

const App = () => {
  return (
    <>
      <Container>
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: 'toast',
            duration: 1000,
          }}
        />
      </Container>
      <Router />
    </>
  );
};

const Container = styled.div``;

export default App;
