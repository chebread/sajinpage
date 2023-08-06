import { atom } from 'jotai';
import { errorAtom } from './errorAtom';
import fileDbAtom from './fileDbAtom';
import filesAtom from './filesAtom';
import { clickedAtom, loadedAtom, viewedAtom } from './viewerAtom';

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
  set(loadedAtom, false);
  set(clickedAtom, false);
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
