import Router from 'components/Router/Router';
import transition from 'layouts/properties/transition';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';

const App = () => {
  return (
    <>
      <Container>
        <Toaster
          position="bottom-center"
          containerClassName="toast-container"
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

const Container = styled.div`
  .toast-container {
  }
  .toast {
    ${transition('all')}
    z-index: 100000;
  }
`;

export default App;
