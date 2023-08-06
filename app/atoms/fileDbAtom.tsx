import { atom } from 'jotai';

type fileDbObjectsType = {
  docId: string;
  fileId: string;
  url: string;
  accessTime: string;
  limit: boolean;
  excess: boolean;
};
const fileDbAtom = atom<fileDbObjectsType>({
  docId: '',
  fileId: '',
  url: '',
  accessTime: '',
  limit: false,
  excess: false,
});

export default fileDbAtom;
