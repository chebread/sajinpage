import PolicyHeader from 'components/Policy/PolicyHeader';
import NotFoundPage from 'pages/NotFoundPage';
import { useParams } from 'react-router-dom';
import Privacy from './Panels/Privacy';
import Terms from './Panels/Terms';

const Policy = () => {
  const params = useParams();
  const type = params.type;
  return type === undefined || type === 'terms' ? (
    <>
      <PolicyHeader />
      <Terms />
    </>
  ) : type === 'privacy' ? (
    <>
      <PolicyHeader />
      <Privacy />
    </>
  ) : (
    <NotFoundPage />
  );
};

export default Policy;
