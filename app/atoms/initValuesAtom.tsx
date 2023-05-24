import { atom } from 'jotai';
import fileDbAtom from './fileDbAtom';
import {
  docIdAtom,
  fileAtom,
  isFileAtom,
  isSelectedAtom,
  limitAtom,
  timeLimitAtom,
} from './uploadFileAtom';

const initValuesAtom = atom(null, (get, set) => {
  set(fileAtom, '');
  set(isFileAtom, false);
  set(docIdAtom, '');
  set(limitAtom, false);
  set(timeLimitAtom, '');
  set(isSelectedAtom, false);
  set(fileDbAtom, {});
});

export default initValuesAtom;
