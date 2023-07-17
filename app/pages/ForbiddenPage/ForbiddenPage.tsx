import {
  isIeAtom,
  isSupportedIndexedDbAtom,
} from 'atoms/serviceRestrictionsAtom';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

// (0): Forbidden된 조건(ie냐, idx냐, 둘다냐)에 따라 route를 나누기!
const ForbiddenPage = ({ code, message }) => {
  const navigate = useNavigate();
  const [isNotSupportedIndexedDb] = useAtom(isSupportedIndexedDbAtom);
  const [isIe] = useAtom(isIeAtom);

  const onClickRedirect = () => {
    if (isIe) {
      // (0): mac에서 일단은 safari로 리다에렉션하는 것을 찾아보자. npm이나
      // Edge로 리다이렉션함
      const win = window as Window;
      // win.location = 'microsoft-edge:' + win.location;
      // setTimeout(function () {
      //   win.location = 'https://go.microsoft.com/fwlink/?linkid=2135547';
      // }, 1);
    }
    if (!isNotSupportedIndexedDb) {
      // 브라우저를 새로고침함
      navigate(0);
    }
  };

  return (
    <>
      <h1>{code}</h1>
      <div>{message}</div>
      <button onClick={onClickRedirect}>
        {isIe ? 'Go edge' : 'Refresh this page'}
      </button>
    </>
  );
};

export default ForbiddenPage;
