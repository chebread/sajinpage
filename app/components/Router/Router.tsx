import { RouterProvider } from 'react-router-dom';
import { forbiddenRouter, router } from './routes';
import { isIeAccessDeniedAtom, isSupportedIndexedDbAtom } from 'atoms';
import { useAtom } from 'jotai';

const Router = () => {
  const [isSupportedIndexedDb] = useAtom(isSupportedIndexedDbAtom);
  const [isIeAccessDenied] = useAtom(isIeAccessDeniedAtom);

  return (
    <RouterProvider
      router={
        isIeAccessDenied
          ? // ie 브라우저이라면
            forbiddenRouter({
              errorMessage: 'IE 브라우저에서는 이 앱을 실행시킬 수 없습니다',
            })
          : isSupportedIndexedDb
          ? // indexedDb를 지원한다면
            router
          : // indexedDb를 지원하지 않는다면
            forbiddenRouter({
              errorMessage: '브라우저가 indexedDb를 지원하지 않습니다',
            })
      }
    />
  );
};

export default Router;
