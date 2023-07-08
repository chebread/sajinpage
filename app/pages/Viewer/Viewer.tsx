import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRealtimeFiles, loadFiles, updateFiles } from 'api';
import PageLoading from 'pages/PageLoading';
import ImagesViewer from './panels/ImagesViewer';
import { useAtom } from 'jotai';
import { fileDbAtom, initValuesAtom } from 'atoms';
import useInterval from 'hooks/useInterval';
import checkFileSession from 'api/checkFiledSession';
import onDelete from 'components/Viewer/onDelete';

// (0): 예시로 pdf 파일 띄워보기
// (0): updatefile 시 image viewer에 반영이 안됨
// (0): delete file 안됨 (실시간이 안먹힘)
// (0): return의 src가 업데이트 되도 안먹힘
// (0): 로직 전체다 개편하기!!! (viewer 쪽만)
// (0): delete 같은 처리는 그냥 수동으로 하는게 나을듯 리얼타임 말고

const Viewer = () => {
  const params = useParams();
  const docId = params.id;
  const [fileDb, setFileDb] = useAtom(fileDbAtom);
  const [isLoaded, setIsLoaded] = useState(false); // 파일 로드 유무
  const [error, setError]: any = useState(false); // 이걸로 오류를 띄우게 됨
  const [, initValues] = useAtom(initValuesAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // 여기서 발생되는 처리는 처음 접근시임!
    const onLoad = async () => {
      // fetch data as realtime
      fetchRealtimeFiles({
        tableId: 'refs',
        onUpdate: (payload: any) => {
          // file update
          console.log('파일의 정보가 업데이트됨'); // toast 안함
          setFileDb(payload.new);
        },
        onDelete: (payload: any) => {
          // file deleted or file session excessed
          console.log('파일이 삭제됨'); // toast
          setFileDb(payload.new);
          initValues(); // 가기전에 초기화
          navigate('/'); // 라우트 안하고 홈으로 가기
        },
      });
      // file db 가져오기
      const fileDb = await loadFiles(docId); // 최초 접근시 파일이 삭제되면 여기서 에러가 발생하게 됨
      setFileDb(fileDb);
      // file is loaded
      setIsLoaded(true); // 여기서 값을 설정하더라도 useEffect 함수가 끝나야 반영됨
      // check file excess
      // 처음 excess 확인은 image viewer에서 수행함
      if (fileDb.excess) {
        // file excess
        onError({
          code: 403,
          message: '파일 세션 종료됨',
        });
      }
    };
    onLoad().catch(() => {
      // file not existed
      // 이때는 존재하지 않음이라는 라우트를 보여줌
      console.log('파일이 존재하지 않음');
      onError({
        code: 404,
        message: '파일이 존재하지 않음',
      });
    });
    return () => {
      initValues(); // 컴포넌트 끝날시에 값 초기화
    };
  }, []);
  // check file session
  useInterval(async () => {
    // 1초마다 파일의 세션 확인
    if (!error && fileDb.limit && fileDb.excess != true) {
      // 세션 초과되지 않았을때 && 에러가 나지 않을때 && limit mode 일때만 작동함
      const url = fileDb.url;
      await checkFileSession(url, endedSession);
    }
  }, 1000);
  const endedSession = async () => {
    // 세션 종료시 파일 삭제하지 말고 doc의 excess: true 하기
    // 수동으로 파일 삭제하게끔 하기!
    // 라우트로 가요!
    console.log('세션 종료'); // toast
    updateFiles({
      docId: fileDb.docId,
      excess: true, // 파일 세션 초과됨
    });
    onError({ code: 403, message: '파일 세션 종료됨' });
  };

  const onError = ({ code, message }) => {
    setError({ code, message });
    // onError에서는 값 초기화하면 안됨!
    // initValues(); // 에러가 뜬다는 것은 파일의 데이터가 필요하지 않다는 것으로 파일의 데이터가 필요없기에 바로 버린다
  };

  return error ? (
    // 2) 에러가 발생함
    (() => {
      switch (error.code) {
        case 404:
          return <div>파일이 존재하지 않음</div>;
        case 403:
          return (
            <>
              <div>파일 세션이 종료됨</div>
              <div>
                <button onClick={() => onDelete(fileDb.docId)}>Delete</button>
              </div>
            </>
          );
        default:
          return null;
      }
    })()
  ) : isLoaded ? (
    // 2) 파일이 로드됨
    <ImagesViewer endedSession={endedSession} />
  ) : (
    // 1) 로딩
    <PageLoading />
  );
};

export default Viewer;
