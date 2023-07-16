import {
  isIeAccessDeniedAtom,
  isSupportedIndexedDbAtom,
} from 'atoms/serviceRestrictionsAtom';
import ErrorPage from 'components/ErrorPage';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

// (0): Forbidden된 조건(ie냐, idx냐, 둘다냐)에 따라 route를 나누기!
const ForbiddenPage = ({ errorMessage }) => {
  const navigate = useNavigate();
  const [isSupportedIndexedDb] = useAtom(isSupportedIndexedDbAtom);
  const [isIeAccessDenied] = useAtom(isIeAccessDeniedAtom);

  const onClickRedirect = () => {
    if (isIeAccessDenied) {
      // Edge로 리다이렉션함
      const win = window as Window;
      win.location = 'microsoft-edge:' + window.location;
    }
    if (isSupportedIndexedDb) {
      // 브라우저를 새로고침함
      navigate(0);
    }
  };

  return (
    <ErrorPage
      errorCode={403}
      errorMessage={errorMessage}
      onClick={onClickRedirect}
    />
  );
};

export default ForbiddenPage;
