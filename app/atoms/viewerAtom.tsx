import { atom } from 'jotai';

const loadedAtom = atom(false); // (0): 없에기
const viewedAtom = atom(false); // 버튼이 보여짐을 설정함 (viewerheader)
const clickedAtom = atom(false);
const modeToggleAtom = atom(false);
const resetToggleAtom = atom(false);

const onCancelAtom = atom(null, (get, set) => {
  set(clickedAtom, false);
  set(modeToggleAtom, false);
  set(resetToggleAtom, false);
});

export {
  loadedAtom,
  clickedAtom,
  viewedAtom,
  modeToggleAtom,
  resetToggleAtom,
  onCancelAtom,
};
