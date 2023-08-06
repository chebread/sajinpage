import { atom } from 'jotai';

const loadedAtom = atom(false); // (0): 없에기
const viewedAtom = atom(false); // 버튼이 보여짐을 설정함 (viewerheader)
const clickedAtom = atom(false);

export { loadedAtom, clickedAtom, viewedAtom };
