import { useRef } from 'react';
import { RouterProvider } from 'react-router-dom';
import Bowser from 'bowser';
import { forbiddenRouter, router } from './routes';

const Router = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const browserName: any = useRef(browser.getBrowserName());
  const isIe = browserName.current === 'Internet Explorer';
  const isIndexedDb = 'indexedDB' in window;

  // (0): 403 로직 재구성하기
  // notSupportedIdexedDb (c1) / accessDeniedIe (c2)
  // c1만 충족하는 경우
  // c2만 충족하는 경우
  // c1, c2를 동시에 충족하는 경우 :(0)
  return (
    <RouterProvider
      router={
        !isIe
          ? isIndexedDb
            ? forbiddenRouter({
                errorCode: 'indexedDb',
                errorMessage: '브라우저가 indexedDb를 지원하지 않습니다',
              })
            : forbiddenRouter({
                errorCode: 'ie',
                errorMessage: 'IE 브라우저에서는 이 앱을 실행시킬 수 없습니다',
              })
          : router
      }
    />
  );
};

export default Router;
