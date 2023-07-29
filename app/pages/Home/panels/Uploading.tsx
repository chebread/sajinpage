import { useEffect } from 'react';
import { uploadFiles } from 'api';
import { useAtom } from 'jotai';
import {
  urlAtom,
  fileIdAtom,
  isUploadedAtom,
  accessTimeAtom,
  docIdAtom,
  fileAtom,
  limitAtom,
  timeLimitAtom,
} from 'atoms/filesAtom';
import initValuesAtom from 'atoms/initValuesAtom';

// 파일을 업로드하는 부분

// (0): 구 sajin과 똑같이 (원이 돌아가는 animation으로 or 그냥 page loading의 logo 그림으로 처리하기) svg size는 page loading 같이 구현하기

const Uploading = () => {
  const [file] = useAtom(fileAtom);
  const [docId] = useAtom(docIdAtom);
  const [fileId] = useAtom(fileIdAtom);
  const [, setIsUploaded] = useAtom(isUploadedAtom);
  const [, setUrl] = useAtom(urlAtom);
  const [limit] = useAtom(limitAtom);
  const [timeLimit] = useAtom(timeLimitAtom);
  const [accessTime] = useAtom(accessTimeAtom);
  const [, initValues] = useAtom(initValuesAtom);

  useEffect(() => {
    const onLoad = async () => {
      // 파일 업로드
      await uploadFiles({
        docId: docId,
        fileId: fileId,
        file: file,
        limit: limit,
        timeLimit: timeLimit, // '' or sec
        accessTime: accessTime,
      })
        .then(() => {
          // 파일 업로드 완료
          // setUrl이 처음에 idb를 위한 "my files 접근을 위해 db에 key: docId / value: url을 저장" 여기서 필요해서 그런 것임. 이제 setUrl은 필요없음
          setIsUploaded(true); // 파일이 업로드됨을 알림 (home에서 uploaded로 넘어가기 위해서)
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
