import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRealtimeFiles, loadFiles, updateFiles } from 'api';
import PageLoading from 'pages/PageLoading';
import FilesViewer from 'components/Viewer/FilesViewer/FilesViewer';
import { useAtom } from 'jotai';
import { errorAtom, onErrorAtom } from 'atoms/errorAtom';
import fileDbAtom from 'atoms/fileDbAtom';
import initValuesAtom from 'atoms/initValuesAtom';
import useInterval from 'hooks/useInterval';
import checkFileSessionByAccessTime from 'api/checkFileSessionByAccessTime';
import ViewerErrorPage from './panels/ViewerErrorPage';
import isEmptyObject from 'lib/isEmptyObject';
import supabase from 'lib/supabase';
import { expandedAtom, viewedAtom } from 'atoms/viewerAtom';
import { insertIdb } from 'lib/idb';
import { broadcastChannel, triggerEvent } from 'lib/broadcastChannel';
import { get } from 'idb-keyval';
import { deleteIdb } from 'lib/idb';
import ViewerBottomModal from 'components/Viewer/ViewerBottomModal';
import checkImage from 'lib/checkImage';
import type fileDbType from 'types/fileDbType';

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
  const [, setExpanded] = useAtom(expandedAtom);

  useEffect(() => {
    const onLoad = async () => {
      // import file db
      const fileDb: fileDbType = await loadFiles(docId).catch(() => {
        throw new Error('404');
      });
      setFileDb(fileDb);
      // add data in idb for MyFiles
      const enabled = await get('enabled_myfiles');
      if (enabled === undefined ? true : enabled) {
        // only MyFiles is active
        // all case save except file isn't existent
        await insertIdb(docId);
      }
      const accessTime = fileDb.accessTime;
      const isFileExcess = await checkFileSessionByAccessTime(accessTime);
      // check if file is excess
      if (isFileExcess) {
        // file is excess
        await endedSession();
      } else {
        // file is already excess before loaded
        if (fileDb.excess) {
          onError({
            code: 403,
            message: '파일 세션 종료됨',
          });
        } else {
          // file isn't excess && file is existent => mode is normal or not excess limited mode
          // file is loaded
          setLoaded(true);
          // first run interval
          setDelay(true);
          // file is viewed
          setViewed(true);
        }
      }
    };
    // track event
    broadcastChannel.addEventListener('message', onMessage); // (i(중요)): 이것은 꼭 필요함. 왜냐하면 supabase broadcast api는 같은 라우터에서 동작하지 않음
    window.addEventListener('evented', onMessage); // (0): broadcast channel만 사용하기 window.add...는 이제 없에기
    // track event as realtime
    const realtimeChannel = fetchRealtimeFiles({
      tableId: 'refs',
      onUpdate: (payload: any) => {
        // file is updated
        if (payload.new.docId === docId) {
          setFileDb(payload.new); // 업데이트 된 파일의 docId와 현재 라우터의 docId가 일치시 업데이트가 반영됨
        }
      },
      onDelete: async (payload: any) => {
        // file is deleted
        if (payload.payload.docId === docId) {
          await onDeleted(); // 삭제된 파일의 docId와 현재 라우터의 docId가 일치시 업데이트가 반영됨
        }
      },
      onSubscribed: async () => {
        // run onLoad after subscribed
        onLoad().catch(error => {
          const errorCode = Number(error.message);
          if (errorCode === 404) {
            // file isn't existent
            onError({
              code: 404,
              message: '파일이 존재하지 않음',
            });
          }
        });
      },
    });

    return () => {
      // viewer 컴포넌트 끝날시에 값 초기화 && Realtime channel을 unchannel함
      supabase.removeChannel(realtimeChannel);
      broadcastChannel.removeEventListener('message', onMessage); // (0): broadcast만 써도 작동되는 것 같던데, 일단 보류하고 점검하기
      window.removeEventListener('evented', onMessage);
      initValues();
    };

    /* test code */
    insertIdb(docId);
    setLoaded(true);
    setViewed(true);
    setFileDb({
      url: 'https://63c605548c76513e84ac879d-cpnrofmfjd.chromatic.com/starwars.mp4',
      docId: '',
      fileId: '',
      accessTime: '',
      limit: false,
      excess: false,
      uploadType: 'url',
      fileType: 'video',
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
    triggerEvent('CLEAR');
    initValues();
    navigate('/'); // 홈으로 갑니다
  };

  const onMessage = async (e: any) => {
    // (0): 같은 docId인지 판단하기 (onDelete 처럼)
    if (e.data != undefined) {
      if (e.data === `DELETE ${docId}`) {
        await onDeleted();
      }
    } else {
      if (e.detail.data === `DELETE ${docId}`) {
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
        setExpanded(false); // 확대된 것 축소하기
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
    // const buckets = await get('urls');
    // deleteIdb(buckets, docId);
    // triggerEvent('CLEAR');
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
      <FilesViewer />
      <ViewerBottomModal />
    </>
  ) : (
    // 1) 로딩
    <PageLoading />
  );
};

export default Viewer;
