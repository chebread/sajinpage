import { atom } from 'jotai';
import type fileDbType from 'types/fileDbType';

const fileDbAtom = atom<fileDbType>({
  docId: '',
  fileId: '',
  url: '',
  accessTime: '',
  limit: false,
  excess: false,
  uploadType: '',
});

export default fileDbAtom;
