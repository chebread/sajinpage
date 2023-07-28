import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';
import Header from 'components/Header';
import Navigator from 'components/Navigator';
import Home from 'pages/Home';
import NotFoundPage from 'pages/NotFoundPage';
import ForbiddenPage from 'pages/ForbiddenPage';
import Viewer from 'pages/Viewer';
import MyFiles from 'pages/MyFiles';
import Settings from 'pages/Settings';
import Help from 'pages/Help';
import ViewerHeader from 'components/Viewer/ViewerHeader';
import ViewerNavigator from 'components/Viewer/ViewerNavigator';
import DesktopScreen from 'layouts/screens/DesktopScreen';

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
        <Route path="/" element={<Home />} />
        <Route path="f" element={<MyFiles />} />
        <Route path="s" element={<Settings />} />
        <Route path="h" element={<Help />} />
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
