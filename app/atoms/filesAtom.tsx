import { atom } from 'jotai';
import type filesType from 'types/filesType';

const filesAtom = atom<filesType>({
  file: new File([''], ''), // 바이너리 파일 자체를 저장
  fileType: '', // 파일의 type을 저장
  docId: '', // 파일의 docId를 저장
  fileId: '', // 파일의 fileId를 저장
  accessTime: '', // 파일의 허용 가능 시간을 저장함
  timeLimit: 0, // 단일 end time 값만 저장함 => 초만 저장함
  selected: false, // 파일의 출력 모드를 저장
  uploaded: false, // 파일이 업로드 됬는지를 저장함
  limit: false, // limit 설정되어 있는지 저장하는 불리언값
  filed: false, // 파일의 전송 유무를 저장
  uploadType: '', // 파일 업로드의 타입을 저장 (FILE / URL)
  url: '',
});

export default filesAtom;
