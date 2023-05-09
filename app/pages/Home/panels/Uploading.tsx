import { useEffect } from 'react';
import { uploadFiles } from 'api';
import { useAtom } from 'jotai';
import { docIdAtom, fileAtom, limitAtom, timeLimitAtom } from 'atoms';

// (0): 업로딩중에 취소 기능 추가하기
// *(0): 업로드 후 back 이 안됨 (/ 으로 가는)
const Uploading = ({ onCancel, init }) => {
  const [file] = useAtom(fileAtom);
  const [, setDocId] = useAtom(docIdAtom);
  const [limit] = useAtom(limitAtom);
  const [timeLimit] = useAtom(timeLimitAtom);

  useEffect(() => {
    console.log(limit, timeLimit); // normal: false, 0

    const onLoad = async () => {
      // 파일 업로드
      await uploadFiles({ file: file, limit: limit, timeLimit: timeLimit })
        .then(id => {
          console.log('파일을 업로드했습니다');
          setDocId(id);
        })
        .catch(() => {
          alert('파일 업로드중 오류 발생');
          // 값들을 초기화 하여 처음 화면으로 돌아가기
          init(); // docId는 값이 없으므로 초기화 하지 않아도 되지만 편의상 초기화함
        });
    };
    onLoad();
  }, []);

  return (
    <>
      <div>Uploading...</div>
      <button onClick={onCancel}>cancel uploading</button>
    </>
  );
};

export default Uploading;
