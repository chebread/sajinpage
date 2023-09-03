import { atom } from 'jotai';

const timeLimitOptionsAtom = atom([
  // { value: 5, label: '5초' }, // for test
  { value: 300, label: '5분' },
  { value: 900, label: '15분' },
  { value: 1800, label: '30분' },
  { value: 3600, label: '1시간' },
  { value: 86400, label: '1일' },
]);

export default timeLimitOptionsAtom;
