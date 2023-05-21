import { atom } from 'jotai';

const acceptFileTypesAtom = atom({
  // []의 뜻은 없지만 꼭 써주어야 함
  'image/*': [], // 이미지 파일 전체를 받음
  'application/pdf': [], // pdf 파일을 받음
});

export default acceptFileTypesAtom;
