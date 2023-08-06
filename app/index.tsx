import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import GlobalStyles from 'layouts/GlobalStyles';
import { HelmetProvider } from 'react-helmet-async';
import { loadableReady } from '@loadable/component';

// 앱의 initialization 설정

const targetDom = document.getElementById('root');
const root = ReactDOM.createRoot(targetDom as HTMLElement); // targetDom이 Null이라 ! 추가
// root.render(
//   <HelmetProvider>
//     <GlobalStyles />
//     <App />
//   </HelmetProvider>
// );

if (import.meta.env.PROD) {
  console.log(1);
  loadableReady(() => {
    ReactDOM.hydrateRoot(
      targetDom as HTMLElement,
      <HelmetProvider>
        <GlobalStyles />
        <App />
      </HelmetProvider>
    );
  });
} else {
  console.log(0);

  root.render(
    <HelmetProvider>
      <GlobalStyles />
      <App />
    </HelmetProvider>
  );
}
