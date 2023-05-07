import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from 'react-router-dom';
import Home from 'pages/Home';
import NotFoundPage from 'pages/NotFoundPage';
import ServiceUnavailable from 'pages/ServiceUnavailable';
import ForbiddenPage from 'pages/ForbiddenPage';
import Viewer from 'pages/Viewer';

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
      <Route path="v/:id" element={<Viewer />} />
      <Route path="503" element={<ServiceUnavailable />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export { forbiddenRouter, router };
