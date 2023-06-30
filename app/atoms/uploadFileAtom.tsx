import { atom } from 'jotai';

const fileAtom = atom('');
const isFileAtom = atom(false);
const docIdAtom = atom('');
const isSelectedAtom = atom(false);
const limitAtom = atom(false); // limit 설정되어 있는지 저장하는 불리언값
const timeLimitAtom = atom(''); // 단일 end time 값만 저장함 => 초만 저장함

export {
  fileAtom,
  isFileAtom,
  docIdAtom,
  isSelectedAtom,
  limitAtom,
  timeLimitAtom,
};
