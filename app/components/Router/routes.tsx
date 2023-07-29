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
import ViewerHeader from 'components/Viewer/ViewerHeader';
import ViewerNavigator from 'components/Viewer/ViewerNavigator';

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
        <Route path="f" element={<MyFiles />} />
        <Route path="s" element={<Settings />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route
        element={
          <>
            <ViewerHeader />
            <Outlet />
            <ViewerNavigator />
          </>
        }
      >
        <Route path="v/:id" element={<Viewer />} />
      </Route>
    </>
  )
);

export { forbiddenRouter, router };
