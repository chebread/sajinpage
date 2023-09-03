import { atom } from 'jotai';
import { errorAtom } from './errorAtom';
import fileDbAtom from './fileDbAtom';
import filesAtom from './filesAtom';
import { linkUploaderClickedAtom } from './uploaderAtom';
import {
  clickedAtom,
  editClickedAtom,
  expandedAtom,
  menuClickedAtom,
  mutedAtom,
  viewedAtom,
} from './viewerAtom';

const initValuesAtom = atom(null, (get, set) => {
  set(fileDbAtom, {
    docId: '',
    fileId: '',
    url: '',
    accessTime: '',
    limit: false,
    excess: false,
    uploadType: '',
    fileType: '',
  });
  set(errorAtom, {});
  set(clickedAtom, false);
  set(menuClickedAtom, false);
  set(editClickedAtom, false);
  set(viewedAtom, false);
  set(expandedAtom, false);
  set(mutedAtom, true);
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
    uploadType: '',
    url: '',
  });
});

export default initValuesAtom;
