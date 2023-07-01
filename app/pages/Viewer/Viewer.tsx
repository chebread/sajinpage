import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteFiles, fetchRealtimeFiles, loadFiles } from 'api';
import PageLoading from 'pages/PageLoading';
import ImagesViewer from './panels/ImagesViewer';
import { useAtom } from 'jotai';
import { fileDbAtom, initValuesAtom, isFileAtom } from 'atoms';
import useInterval from 'hooks/useInterval';
import checkFileSession from 'api/checkFiledSession';

// (0): 예시로 pdf 파일 띄워보기
// (0): 전체 api 로직 개선하기 => 모든 것을 실시간으로!

const Viewer = () => {
  const params = useParams();
  const docId = params.id;
  const [fileDb, setFileDb] = useAtom(fileDbAtom);
  const [isLoaded, setIsLoaded] = useState(false); // 파일 로드 유무
  const [error, setError]: any = useState(); // 이걸로 오류를 띄우게 됨
  const [, initValues] = useAtom(initValuesAtom);

  // (0): 이제 여기 부분만 개편하면 됨. 처음 불러올때 이미지 완전 확인은 안해도 되며, 실시간 확인을 해야함 (limit or public 일때 하기 public은 다른 이용자가 삭제할 수도 있으니 확인해야함. 즉 파일 변경시는 즉시 반영되게 실시간으로 함)

  // (0): 여기 로직 완전히 바꾸고, checking file을 timelimit으로 처리하는 것이 아닌 api fetching 으로 limit time 알아내거나 아니면 지속적으로 fetching 하여 유효한지 않한지 체크하기
  // (0): mode 수정하거나 limit time 수정부분을 완전히 바꾸기, file 참조로 새로운 url 생성하기!!!!!

  useEffect(() => {
    const onLoad = async () => {
      // file db 가져오기
      const fileDb = await loadFiles(docId); // 최초 접근시 파일이 삭제되면 여기서 에러가 발생하게 됨
      setFileDb(fileDb);
      // test
      // file is loaded
      setIsLoaded(true); // 여기서 값을 설정하더라도 함수가 끝나야 반영됨
      // 최초 접근시 파일의 세션을 확인함
      await checkFileSession(fileDb, sessionEnded);
      // fetch data as realtime
      fetchRealtimeFiles({
        tableId: 'refs',
        onUpdate: (payload: any) => {
          console.log('파일의 정보가 업데이트됨');
          setFileDb(payload.new);
        },
        onDelete: (payload: any) => {
          // (0): onDelete를 없에고 수동으로 delete file시에 onError 되게끔 설정할까? 그래야 세션 종료시에도 onDelete 이벤트가 감지되지 않음
          // 실시간으로 파일이 삭제됨을 감지 (실시간 o)
          // => 최초 접근시 세션이 종료되면 이 이벤트는 작동하지 않음
          console.log('파일이 삭제됨');
          setFileDb(payload.new);
          onError({
            code: 404,
            message: '파일이 삭제됨',
          });
          // throw new Error('파일이 삭제됨');
        },
      });
    };
    onLoad().catch(() => {
      // 최초 접근시 파일이 삭제되어 접근 불가 (실시간 x)
      // console.log('파일이 존재하지 않음');
      onError({
        code: 404,
        message: '파일이 존재하지 않음',
      }); // (0): onError 처리가 아닌 new Error 로 해볼까?
    });
    return () => {
      initValues(); // 컴포넌트 끝날시에 값 초기화
    };
  }, []);

  useInterval(async () => {
    // 1초마다 파일의 세션 확인
    if (!error && fileDb.limit) {
      // 에러가 나지 않을때 && limit mode 일때만 작동함
      await checkFileSession(fileDb, sessionEnded);
    }
  }, 1000);

  const sessionEnded = async () => {
    console.log('세션 종료');
    await deleteFiles(docId); // (0): 세션 종료와 onDelete를 분리해야함
    onError({
      code: 403,
      message: '세션이 종료됨',
    }); // (0): 이게 realtime에서 delete를 감지하여 세션 종료가 소용이 없음. 세션 종료시에는 세션 종료 에러가 뜨게끔 하기!
  };
  const onError = ({ code, message }) => {
    setError({
      code: code,
      message: message,
    });
    initValues(); // 에러가 뜬다는 것은 파일의 데이터가 필요하지 않다는 것으로 파일의 데이터가 필요없기에 바로 버린다
  };

  return error ? (
    // 2) 에러가 발생함
    // (0): 각각의 code 마다 에러 페이지에다가 에러 코드와 에러 메시지를 전달하여 띄우기
    <>
      <h1>{error.code} Error</h1>
      <div>{error.message}</div>
    </>
  ) : isLoaded ? (
    // 2) 파일이 로드됨
    <ImagesViewer />
  ) : (
    // 1) 로딩
    <PageLoading />
  );
};

export default Viewer;
