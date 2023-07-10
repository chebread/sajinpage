import { atom } from 'jotai';

const fileAtom = atom<File>(new File([''], '')); // 바이너리 파일 자체를 저장
const fileTypeAtom = atom(''); // 파일의 type을 저장
const isFileAtom = atom(false); // 파일의 전송 유무를 저장
const docIdAtom = atom(''); // 파일의 docId를 저장
const isSelectedAtom = atom(false); // 파일의 출력 모드를 저장
const limitAtom = atom(false); // limit 설정되어 있는지 저장하는 불리언값
const timeLimitAtom = atom(''); // 단일 end time 값만 저장함 => 초만 저장함
const accessTimeAtom = atom(''); // 파일의 허용 가능 시간을 저장함

export {
  fileAtom,
  isFileAtom,
  docIdAtom,
  isSelectedAtom,
  fileTypeAtom,
  limitAtom,
  timeLimitAtom,
  accessTimeAtom,
};
