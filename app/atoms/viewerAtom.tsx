import { atom } from 'jotai';

const viewedAtom = atom(false); // 버튼이 보여짐을 설정함 (viewerheader)
const clickedAtom = atom(false);
const modeToggleAtom = atom(false);
const resetToggleAtom = atom(false);
const onCancelAtom = atom(null, (get, set) => {
  set(editClickedAtom, false);
  set(modeToggleAtom, false);
  set(resetToggleAtom, false);
  set(clickedAtom, false);
  set(menuClickedAtom, false);
});
const menuClickedAtom = atom(false);
const expandedAtom = atom(false);
const editClickedAtom = atom(false);
const playingAtom = atom(true);
const mutedAtom = atom(true);

export {
  clickedAtom,
  viewedAtom,
  modeToggleAtom,
  resetToggleAtom,
  onCancelAtom,
  menuClickedAtom,
  expandedAtom,
  editClickedAtom,
  playingAtom,
  mutedAtom,
};
