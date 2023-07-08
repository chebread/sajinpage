import { atom } from 'jotai';
import { errorAtom } from './errorAtom';
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
  set(errorAtom, {});
});

export default initValuesAtom;
