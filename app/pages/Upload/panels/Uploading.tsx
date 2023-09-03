import { useEffect } from 'react';
import { uploadFiles } from 'api';
import { useAtom } from 'jotai';
import PageLoading from 'pages/PageLoading';
import filesAtom from 'atoms/filesAtom';
import initValuesAtom from 'atoms/initValuesAtom';
import { toast } from 'react-hot-toast';

// 파일을 업로드하는 부분

const Uploading = () => {
  const [files, setFiles] = useAtom(filesAtom);
  const [, initValues] = useAtom(initValuesAtom);

  useEffect(() => {
    const onLoad = async () => {
      // 파일 업로드
      await uploadFiles({
        docId: files.docId,
        fileId: files.fileId,
        file: files.file,
        limit: files.limit,
        timeLimit: files.timeLimit, // '' or sec
        accessTime: files.accessTime,
        url: files.url, // upload type이 url일때는 string or ''
        uploadType: files.uploadType,
        fileType: files.fileType,
      })
        .then(() => {
          // 파일 업로드 완료
          // setUrl이 처음에 idb를 위한 "my files 접근을 위해 db에 key: docId / value: url을 저장" 여기서 필요해서 그런 것임. 이제 setUrl은 필요없음
          setFiles(prevState => {
            return {
              ...prevState,
              uploaded: true, // 파일이 업로드됨을 알림 (home에서 uploaded로 넘어가기 위해서)
            };
          });
        })
        .catch(error => {
          console.error(error);
          toast.error('파일을 업로드중 에러가 발생했습니다.');
          // 값들을 초기화 하여 처음 화면으로 돌아가기
          initValues(); // 모든 전역 상태를 초기화하여 uploader로 갈 수 있게 하게끔 한다
        });
    };
    onLoad();
  }, []);

  return <PageLoading />;
};

export default Uploading;
