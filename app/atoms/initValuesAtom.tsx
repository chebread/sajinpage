import { atom } from 'jotai';
import { errorAtom } from './errorAtom';
import fileDbAtom from './fileDbAtom';
import filesAtom from './filesAtom';
import { clickedAtom, menuClickedAtom, viewedAtom } from './viewerAtom';

const initValuesAtom = atom(null, (get, set) => {
  set(fileDbAtom, {
    docId: '',
    fileId: '',
    url: '',
    accessTime: '',
    limit: false,
    excess: false,
  });
  set(errorAtom, {});
  set(clickedAtom, false);
  set(menuClickedAtom, false);
  set(viewedAtom, false);
  set(filesAtom, {
    file: new File([''], ''),
    fileType: '',
    docId: '',
    fileId: '',
    accessTime: '',
    timeLimit: 0,
    selected: false,
    uploaded: false,
    limit: false,
    filed: false,
  });
});

export default initValuesAtom;
