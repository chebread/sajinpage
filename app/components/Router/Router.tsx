import { useRef } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Outlet,
} from 'react-router-dom';
import Bowser from 'bowser';
import Home from 'pages/Home';
import NotFoundPage from 'pages/NotFoundPage';
import ForbiddenPage from 'pages/ForbiddenPage';
import ServiceUnavailable from 'pages/ServiceUnavailable';

const Router = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const browserName: any = useRef(browser.getBrowserName());
  const isIe = browserName.current === 'Internet Explorer';

  const forbiddenRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="*" element={<ForbiddenPage />} />
      </Route>
    )
  );
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="503" element={<ServiceUnavailable />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={isIe ? forbiddenRouter : router} />;
};

export default Router;
