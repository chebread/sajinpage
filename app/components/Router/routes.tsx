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

const forbiddenRouter = ({ errorMessage }) =>
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
          element={<ForbiddenPage errorMessage={errorMessage} />}
        />
      </Route>
    )
  );

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <>
          <Header />
          <Outlet />
        </>
      }
      // errorElement={<ErrorPage />}
    >
      <Route path="/" element={<Home />} />
      <Route path="v/:id" element={<Viewer />} />
      <Route path="f" element={<MyFiles />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export { forbiddenRouter, router };
