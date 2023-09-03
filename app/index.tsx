import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import App from 'App';
import GlobalStyles from 'layouts/GlobalStyles';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

// 앱의 initialization 설정

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <HelmetProvider>
    <GlobalStyles />
    <App />
    <Toaster
      position="bottom-center"
      toastOptions={{
        className: 'toast',
        duration: 2000,
      }}
    />
  </HelmetProvider>
);
