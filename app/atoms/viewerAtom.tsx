import { atom } from 'jotai';

const viewedAtom = atom(false); // 파일이 정상적으로 보이는 지를 판단함
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
