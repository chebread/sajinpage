import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.API_KEY, // 배포시에도 적용하기 위해 REACT_APP_ 접두사를 추가하였습니다
  authDomain: import.meta.env.AUTH_DOMAIN,
  projectId: import.meta.env.PROJECT_ID,
  storageBucket: import.meta.env.STORAGE_BUCKET,
  messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
