import { atom } from 'jotai';

const fileAtom = atom('');
const isFileAtom = atom(false);
const docIdAtom = atom('');
const isSelectedAtom = atom(false);
const limitAtom = atom(false);
const timeLimitAtom = atom({});

export {
  fileAtom,
  isFileAtom,
  docIdAtom,
  isSelectedAtom,
  limitAtom,
  timeLimitAtom,
};
