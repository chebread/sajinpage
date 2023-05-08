import { atom } from 'jotai';

const fileAtom = atom('');
const isFileAtom = atom(false);
const docIdAtom = atom('');

export { fileAtom, isFileAtom, docIdAtom };
