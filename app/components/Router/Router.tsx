import { RouterProvider } from 'react-router-dom';
import { forbiddenRouter, router } from './routes';
import {
  isIeAtom,
  isSupportedIndexedDbAtom,
} from 'atoms/serviceRestrictionsAtom';
import { useAtom } from 'jotai';

const Router = () => {
  const [isSupportedIndexedDb] = useAtom(isSupportedIndexedDbAtom);
  const [isIe] = useAtom(isIeAtom);

  return (
    <RouterProvider
      router={
        isIe
          ? // ie 브라우저이라면
            forbiddenRouter({
              code: 403,
              message: 'IE 브라우저에서는 이 앱을 실행시킬 수 없습니다',
            })
          : isSupportedIndexedDb
          ? // indexedDb를 지원한다면
            router
          : // indexedDb를 지원하지 않는다면
            forbiddenRouter({
              code: 403,
              message: '브라우저가 indexedDb를 지원하지 않습니다',
            })
      }
    />
  );
};

export default Router;
