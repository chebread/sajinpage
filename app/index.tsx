import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import GlobalStyles from 'layouts/GlobalStyles';
import { HelmetProvider } from 'react-helmet-async';
import PageLoading from 'pages/PageLoading';

// 앱의 initialization 설정

const targetDom = document.getElementById('root');
const root = ReactDOM.createRoot(targetDom as HTMLElement);

root.render(
  <HelmetProvider>
    <GlobalStyles />
    <App />
  </HelmetProvider>
);

// if (import.meta.env.PROD) {
//   loadableReady(() => {
//     ReactDOM.hydrateRoot(
//       targetDom as HTMLElement,
//       <HelmetProvider>
//         <GlobalStyles />
//         <App />
//       </HelmetProvider>
//     );
//   });
// } else {
//   root.render(
//     <HelmetProvider>
//       <GlobalStyles />
//       <App />
//     </HelmetProvider>
//   );
// }
