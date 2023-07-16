import { atom } from 'jotai';
import { errorAtom } from './errorAtom';
import fileDbAtom from './fileDbAtom';
import {
  docIdAtom,
  fileAtom,
  fileIdAtom,
  fileTypeAtom,
  isFileAtom,
  isSelectedAtom,
  isUploadedAtom,
  limitAtom,
  timeLimitAtom,
} from './filesAtom';

const initValuesAtom = atom(null, (get, set) => {
  set(fileAtom, new File([''], ''));
  set(fileTypeAtom, '');
  set(isFileAtom, false);
  set(docIdAtom, '');
  set(fileIdAtom, '');
  set(limitAtom, false);
  set(timeLimitAtom, '');
  set(isSelectedAtom, false);
  set(isUploadedAtom, false);
  set(fileDbAtom, {});
  set(errorAtom, {});
});

export default initValuesAtom;
