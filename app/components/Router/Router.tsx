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
              message:
                'Internet Explore 브라우저에서는 이 웹사이트를 접근할 수 없습니다. 대신 Edge 브라우저에서 이 웹사이트를 접근해 주세요.',
            })
          : isSupportedIndexedDb
          ? // indexedDb를 지원한다면
            router
          : // indexedDb를 지원하지 않는다면
            forbiddenRouter({
              message:
                '해당 브라우저가 IndexedDb를 지원하지 않아 이 웹사이트에 접근할 수 없습니다. 대신 다른 브라우저에서 이 웹사이트를 접근해 주세요.',
            })
      }
    />
  );
};

export default Router;
