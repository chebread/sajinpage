import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';
import Header from 'components/Header';
import Navigator from 'components/Navigation';
import Upload from 'pages/Upload';
import NotFoundPage from 'pages/NotFoundPage';
import ForbiddenPage from 'pages/ForbiddenPage';
import Viewer from 'pages/Viewer';
import MyFiles from 'pages/MyFiles';
import Settings from 'pages/Settings';
import Home from 'pages/Home';

const forbiddenRouter = ({ message }) =>
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
        <Route path="*" element={<ForbiddenPage message={message} />} />
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
        <Route path="/" element={<Home />} />
        <Route path="u" element={<Upload />} />
        <Route path="v/:id" element={<Viewer />} />
        <Route path="f" element={<MyFiles />} />
        <Route path="s/:type?" element={<Settings />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  )
);

export { forbiddenRouter, router };
