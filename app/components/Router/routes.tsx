import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';
import Home from 'pages/Home';
import NotFoundPage from 'pages/NotFoundPage';
import ForbiddenPage from 'pages/ForbiddenPage';
import Viewer from 'pages/Viewer';
import MyFiles from 'pages/MyFiles';
import Header from 'components/Header';
import Settings from 'pages/Settings';
import styled from 'styled-components';
import { relativePos } from 'layouts/properties';
import Navigator from 'components/Navigator';

const forbiddenRouter = ({ code, message }) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={
          <>
            <Header />
            <Outlet />
          </>
        }
      >
        <Route
          path="*"
          element={<ForbiddenPage code={code} message={message} />}
        />
      </Route>
    )
  );

const X = styled.div`
  position: relative;
`;
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={
          <>
            <Header />
            <Outlet />
            <Navigator />
          </>
        }
        // errorElement={<ErrorPage />}
      >
        <Route path="/" element={<Home />} />
        <Route path="f" element={<MyFiles />} />
        <Route path="s" element={<Settings />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route
        element={
          <>
            <Header />
            <Outlet />
            <Navigator />
          </>
        }
      >
        <Route path="v/:id" element={<Viewer />} />
      </Route>
    </>
  )
);

export { forbiddenRouter, router };
