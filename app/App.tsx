import Router from 'components/Router/Router';
import { Toaster } from 'react-hot-toast';

// toast 및 router

const App = () => {
  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'toast',
          duration: 2000,
        }}
      />
      <Router />
    </>
  );
};

export default App;
