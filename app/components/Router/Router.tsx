import { useRef } from 'react';
import { RouterProvider } from 'react-router-dom';
import Bowser from 'bowser';
import { forbiddenRouter, router } from './routes';

const Router = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const browserName: any = useRef(browser.getBrowserName());
  const isIe = browserName.current === 'Internet Explorer';

  return <RouterProvider router={isIe ? forbiddenRouter : router} />;
};

export default Router;
