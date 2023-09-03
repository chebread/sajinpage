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
  fileType: '',
});

export default fileDbAtom;
