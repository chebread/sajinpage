import { atom } from 'jotai';

const errorAtom = atom<any>({});
const onErrorAtom = atom(null, (get, set, { code, message }) => {
  set(errorAtom, {
    code: code,
    message: message,
  });
});

export { errorAtom, onErrorAtom };
