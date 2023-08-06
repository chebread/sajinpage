import { atom } from 'jotai';

// (0):이것들을 모두 filesAtom 이라는 객체로 치환하여 관리하자.
type filesObjectsType = {
  file: File;
  fileType: string;
  docId: string;
  fileId: string;
  accessTime: string;
  timeLimit: number;
  selected: boolean; // is selected
  uploaded: boolean; // is uploaded
  limit: boolean;
  filed: boolean; // is file
};
const filesAtom = atom<filesObjectsType>({
  file: new File([''], ''),
  fileType: '',
  docId: '',
  fileId: '',
  accessTime: '',
  timeLimit: 0,
  selected: false,
  uploaded: false,
  limit: false,
  filed: false,
});

const fileAtom = atom<File>(new File([''], '')); // 바이너리 파일 자체를 저장
const fileTypeAtom = atom(''); // 파일의 type을 저장
const urlAtom = atom(''); // 파일 참조하는 url을 저장
const isFileAtom = atom(false); // 파일의 전송 유무를 저장
const docIdAtom = atom(''); // 파일의 docId를 저장
const fileIdAtom = atom(''); // 파일의 fileId를 저장
const isSelectedAtom = atom(false); // 파일의 출력 모드를 저장
const isUploadedAtom = atom(false); // 파일이 업로드 됬는지를 저장함
const limitAtom = atom(false); // limit 설정되어 있는지 저장하는 불리언값
const timeLimitAtom = atom(0); // 단일 end time 값만 저장함 => 초만 저장함
const accessTimeAtom = atom(''); // 파일의 허용 가능 시간을 저장함

export {
  filesAtom,
  fileAtom,
  isFileAtom,
  docIdAtom,
  isSelectedAtom,
  fileTypeAtom,
  limitAtom,
  timeLimitAtom,
  accessTimeAtom,
  urlAtom,
  fileIdAtom,
  isUploadedAtom,
};
