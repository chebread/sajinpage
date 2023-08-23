import { useEffect, useLayoutEffect, useState } from 'react';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { fetchRealtimeFiles, loadFiles, updateFiles } from 'api';
import PageLoading from 'pages/PageLoading';
import ImagesViewer from './panels/ImagesViewer';
import { useAtom } from 'jotai';
import { errorAtom, onErrorAtom } from 'atoms/errorAtom';
import fileDbAtom from 'atoms/fileDbAtom';
import initValuesAtom from 'atoms/initValuesAtom';
import useInterval from 'hooks/useInterval';
import checkFileSessionByAccessTime from 'api/checkFileSessionByAccessTime';
import ViewerErrorPage from './panels/ViewerErrorPage';
import isEmptyObject from 'lib/isEmptyObject';
import supabase from 'lib/supabase';
import { viewedAtom } from 'atoms/viewerAtom';
import { insertIdb } from 'lib/idb';
import { broadcastChannel } from 'lib/broadcastChannel';
import { get } from 'idb-keyval';
import { deleteIdb } from 'lib/idb';

// (0): 파일의 db를 idb에 저장하여서 다시 로딩되는 일 없게하기 만일 idb 삭제시 다시 불러오게 됨

// 파일들을 확인하는 곳

const Viewer = () => {
  const navigate = useNavigate();
  const [delay, setDelay] = useState(false); // false가 중지, true가 실행
  // useInterval을 중지하는 토글 => kill (false) or run (true) 두 상태를 가짐
  // 처음부터 false 해야지 subscribed 되고 나서 활성화할 수 있음
  const [error] = useAtom(errorAtom);
  // 이걸로 오류를 띄워 viewer 라우트를 전환하게 함
  // 굳이 atom으로 처리하는 이유는 error content를 많은 곳에서 (다른 라우트) 사용하기 때문임!
  const [, onError] = useAtom(onErrorAtom);
  const params = useParams();
  const docId = params.id;
  const [fileDb, setFileDb] = useAtom(fileDbAtom);
  const [loaded, setLoaded] = useState(false); // 파일 로드 유무
  const [, initValues] = useAtom(initValuesAtom);
  const [, setViewed] = useAtom(viewedAtom);

  useEffect(() => {
    // 여기서 발생되는 처리는 처음 접근시임
    /* test code */
    const onLoad = async () => {
      // file db 가져오기
      const fileDb = await loadFiles(docId); // 최초 접근시 파일이 삭제되면 여기서 에러가 발생하게 됨
      setFileDb(fileDb);
      // add data in idb for myfiles
      const enabled: boolean = await get('enabled_myfiles');
      if (enabled) {
        // MyFiles 기능 활성화 일때만 파일 저장함
        // 파일이 존재하지 않는 경우만 제외하고 모두 저장함
        await insertIdb(docId);
      }
      const accessTime = fileDb.accessTime;
      const isFileExcess = await checkFileSessionByAccessTime(accessTime);
      // check file excess (excess가 true가 아닌 경우 => 처음으로 파일이 excess인지 확인하기)
      // excess된 image가 잠깐 노출되기 때문에 미리 load하기 전에 checking하여 잠깐 보이는 것을 방지함
      if (isFileExcess) {
        // file is excess
        await endedSession();
        // file은 load 안됬음
      } else {
        // check file excess (이미 file이 excess인 경우)
        if (fileDb.excess) {
          // file is already excess
          onError({
            code: 403,
            message: '파일 세션 종료됨',
          });
          // kill interval 하지 안아도 되는 이유는 이미 interval이 kill 상태임
        } else {
          // file이 excess 아닌 경우 && 404가 아닌 경우 => public or limit mode (아직 유효시간 남은)
          // file is loaded
          setLoaded(true); // 여기서 값을 설정하더라도 useEffect 함수가 끝나야 반영됨
          // first run interval
          setDelay(true); // if limit일때 setDalay 하지 않는 이유는 public에서 limit으로 전환되기 때문에 그냥 useInterval 내부에서 처리하는 것임
          // viewerheader btn viewed 설정
          setViewed(true);
        }
      }
    };
    // track event
    broadcastChannel.addEventListener('message', onMessage);
    window.addEventListener('evented', onMessage);
    // track event as realtime
    const realtimeChannel = fetchRealtimeFiles({
      tableId: 'refs',
      onUpdate: (payload: any) => {
        // console.log('update event', payload);
        // file update
        if (payload.new.docId === docId) {
          // 업데이트 된 파일의 docId와 현재 라우터의 docId가 일치시 업데이트가 반영됨
          setFileDb(payload.new);
        }
      },
      onDelete: async (payload: any) => {
        // console.log('delete event', payload);
        // file deleted
        if (payload.payload.docId === docId) {
          await onDeleted();
        }
      },
      onSubscribed: async () => {
        // realtime subscribed 후에 viewer를 실행함
        // 이게 필요한 이유는 파일이 실시간을 사용할 수 있고 그다음에 업데이트, 제거 등등의 기능을 사용할 수 있도록 로딩 시간을 만들어 주는 역할임
        onLoad().catch(() => {
          // file not existed
          // console.log('파일이 존재하지 않음');
          onError({
            code: 404,
            message: '파일이 존재하지 않음',
          });
          // kill interval 하지 않아도 되는 이유는 run interval 변경하기 전에 이미 false 상태임
        });
      },
    });

    return () => {
      // viewer 컴포넌트 끝날시에 값 초기화 && Realtime channel을 unchannel함
      supabase.removeChannel(realtimeChannel);
      broadcastChannel.removeEventListener('message', onMessage);
      window.removeEventListener('evented', onMessage);
      initValues();
    };
    /* test code */
    insertIdb(docId);
    setLoaded(true);
    setViewed(true);
    setFileDb({
      url: 'https://velog.velcdn.com/images/haneum/post/12b05acf-6022-4f12-87c7-090e72739e5e/image.avif',
      docId: '',
      fileId: '',
      accessTime: '',
      limit: false,
      excess: false,
    });
    return () => {
      initValues();
    };
  }, []);

  // if file is deleted
  const onDeleted = async () => {
    // console.log('파일이 삭제됨');
    const buckets = await get('urls');
    deleteIdb(buckets, docId);
    initValues();
    navigate('/'); // 홈으로 갑니다
  };

  const onMessage = async (e: any) => {
    if (e.data != undefined) {
      if (e.data === 'DELETE') {
        await onDeleted();
      }
    } else {
      if (e.detail.data === 'DELETE') {
        await onDeleted();
      }
    }
  };

  // check file session as realtime each 1sec
  // 세션 초과되지 않았을때 && 에러가 나지 않을때 && limit mode 일때만 useinterval이 작동함
  useInterval(
    async () => {
      const accessTime = fileDb.accessTime;
      const isFileExcess = await checkFileSessionByAccessTime(accessTime);
      if (isFileExcess) {
        await endedSession();
        // kill interval
        setDelay(false); // 세션이 종료되었다는 것은 excess = true 라는 것이니, 이때는 interval이 다음돌때에 돌지 않아야되니 그냥 updateFiles를 믿어도 되지만, onUpdate는 subscribed가 정확하게 되지 않기에 kill를 해주어 안심하게 interval을 중지해야함
        setViewed(false); // 메뉴 접근 중지
      }
    },
    delay && !isEmptyObject(error) && fileDb.limit && !fileDb.excess
      ? 1000
      : null
  );
  const endedSession = async () => {
    await updateFiles({
      docId: fileDb.docId,
      excess: true, // 파일 세션 종료됨
    });
    onError({ code: 403, message: '파일 세션 종료됨' });
  };

  // 해당 페이지가 안보이게될 시
  useLayoutEffect(() => {
    document.addEventListener('visibilitychange', onInvisibility);
    return () =>
      document.removeEventListener('visibilitychange', onInvisibility);
  }, []);

  const onInvisibility = async () => {
    if (document.visibilityState === 'hidden') {
      // 페이지가 안보일때
      setDelay(false); // 실시간 확인을 끔
    }
    if (document.visibilityState === 'visible') {
      // 페이지가 보일때
      // 1초뒤에 실행되더라도, 이것은 감수해야함
      setDelay(true); // 실시간 확인을 켬 => normal 모드 이여도 켜야함! 이유는 if limit일때 setDalay 하지 않는 이유는 public에서 limit으로 전환되기 때문에 그냥 useInterval 내부에서 처리하는 것임 이다
    }
  };

  return isEmptyObject(error) ? (
    // 2) 에러가 발생함
    <ViewerErrorPage errorCode={error.code} />
  ) : loaded ? (
    // 2) 파일이 로드됨
    <>
      <ImagesViewer />
    </>
  ) : (
    // 1) 로딩
    <PageLoading />
  );
};

export default Viewer;
