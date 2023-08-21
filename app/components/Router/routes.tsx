import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';
import Header from 'components/Header';
import Navigator from 'components/Navigator';
import Upload from 'pages/Upload';
import NotFoundPage from 'pages/NotFoundPage';
import ForbiddenPage from 'pages/ForbiddenPage';
import Viewer from 'pages/Viewer';
import MyFiles from 'pages/MyFiles';
import Settings from 'pages/Settings';
import Help from 'pages/Help';
import Policy from 'pages/Policy';

const forbiddenRouter = ({ code, message }) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={
          <>
            <Header />
            <Outlet />
            <Navigator />
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
      >
        <Route path="/" element={<Upload />} />
        {/* <Route path="h" element={<Help />} />
        <Route path="p/:type?" element={<Policy />} /> */}
        <Route path="v/:id" element={<Viewer />} />
        <Route path="f" element={<MyFiles />} />
        <Route path="s/:type?" element={<Settings />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  )
);

export { forbiddenRouter, router };
