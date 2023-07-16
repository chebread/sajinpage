import { useEffect } from 'react';
import { uploadFiles } from 'api';
import { useAtom } from 'jotai';
import {
  accessTimeAtom,
  docIdAtom,
  fileAtom,
  initValuesAtom,
  limitAtom,
  timeLimitAtom,
} from 'atoms';
import { urlAtom } from 'atoms';

// (0): 업로딩중에 취소 기능 추가하기 => 없다고 하는데 구현은 언젠가는 해야함

// 파일을 업로드하는 부분

const Uploading = () => {
  const [file] = useAtom(fileAtom);
  const [, setDocId] = useAtom(docIdAtom);
  const [, setUrl] = useAtom(urlAtom);
  const [limit] = useAtom(limitAtom);
  const [timeLimit] = useAtom(timeLimitAtom);
  const [accessTime] = useAtom(accessTimeAtom);
  const [, initValues] = useAtom(initValuesAtom);

  useEffect(() => {
    const onLoad = async () => {
      // (0): add data in idb

      // 파일 업로드
      await uploadFiles({
        file: file,
        limit: limit,
        timeLimit: timeLimit, // '' or sec
        accessTime: accessTime,
      })
        .then(({ docId, url }) => {
          // 파일 업로드 완료
          setDocId(docId);
          setUrl(url);
        })
        .catch(error => {
          console.log(error);
          alert('파일 업로드중 오류 발생');
          // 값들을 초기화 하여 처음 화면으로 돌아가기
          initValues(); // 모든 전역 상태를 초기화하여 uploader로 갈 수 있게 하게끔 한다
        });
    };
    onLoad();
  }, []);

  return (
    <>
      <div>Uploading...</div>
    </>
  );
};

export default Uploading;
