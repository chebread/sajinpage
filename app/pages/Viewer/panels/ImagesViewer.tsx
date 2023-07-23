import { useState } from 'react';
import getUrl from 'lib/getUrl';
import styled from 'styled-components';
import updateFiles from 'api/updateFiles';
import Select from 'react-select';
import { useAtom } from 'jotai';
import fileDbAtom from 'atoms/fileDbAtom';
import timeLimitOptionsAtom from 'atoms/timeLimitOptionsAtom';
import { errorAtom } from 'atoms/errorAtom';
import onDelete from 'components/Viewer/onDelete';
import supabase from 'lib/supabase';
import addTime from 'lib/addTime';
import dateToString from 'lib/dateToString';
import getCurrentTime from 'lib/getCurrentTime';
import { FullScreen, ImagesScreen } from 'layouts/screens';
import {
  absolutePos,
  centerAlign,
  desktopVp,
  relativePos,
} from 'layouts/properties';
import Header from 'components/Header';
import transition from 'layouts/properties/transition';
import { cssVarsPalette } from 'layouts/cssVars';
import FullContentScreen from 'layouts/screens/FullContentScreen';

const ImagesViewer = () => {
  const [fileDb] = useAtom(fileDbAtom);
  const url = getUrl(); // current app url
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);
  const [modeToggle, setModeToggle] = useState(false);
  const [resetToggle, setResetToggle] = useState(false);

  const initValues = () => {
    setModeToggle(false);
    setResetToggle(false);
  };
  const onModeToggle = () => {
    setModeToggle(!modeToggle);
  };
  const onResetToggle = () => {
    setResetToggle(!resetToggle);
  };

  const onTurnOffLimitMode = async () => {
    // turn on public mode
    const { data: fileUrl, error: fileUrlError }: any = supabase.storage
      .from('images')
      .getPublicUrl(fileDb.fileId);
    const url = fileUrl.publicUrl;
    // update files
    await updateFiles({
      docId: fileDb.docId,
      url: url,
      limit: false,
      accessTime: '',
    }).catch(error => {
      console.log(error);
    });
    initValues();
  };
  const onModeSelect = async (e: any) => {
    // turn on limit mode
    const { value } = e; // value is timeLimit
    if (value) {
      const timeLimit = value;
      // update accessTime
      const currentTime = getCurrentTime();
      const accessTime = dateToString(
        addTime({ currentTime: currentTime, sec: timeLimit })
      );
      // update limit url
      const { data: fileUrl, error: fileUrlError }: any = await supabase.storage
        .from('images')
        .createSignedUrl(fileDb.fileId, timeLimit);
      // signed url error checking
      if (fileUrlError) {
        // an error occurs
        throw new Error('file signed url 생성중 오류 발생');
      }
      const url = fileUrl.signedUrl;
      // update file
      await updateFiles({
        docId: fileDb.docId,
        url: url,
        limit: true,
        accessTime: accessTime,
      }).catch(error => {
        console.log(error);
      });
      initValues();
    }
  };
  const onCancel = () => {
    setModeToggle(false);
    setResetToggle(false);
  };

  // 기능을 작동시키는 버튼만 존재. 버튼의 component는 따로 구현
  return (
    <Container>
      <ImagesScreen src={fileDb.url} />
    </Container>
  );
};

const Container = styled(FullContentScreen)`
  // (0): 왜 전체의 height가 적용되는지는 모르겠음, 아 맞네, 전체의 height를 img도 전체를 Height로 잡으니 영향을 받는 것임 ㅋㅋㅋㅋ
`;

export default ImagesViewer;

/*
<button onClick={() => onDelete(fileDb.docId)}>delete file</button>
      {fileDb.limit ? (
        // limit mode
        modeToggle ? (
          <>
            {resetToggle ? (
              //  time limit 시간 설정하기 (같음)
              <>
                <Select onChange={onModeSelect} options={timeLimitOptions} />
                <button onClick={onCancel}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={onResetToggle}>
                  limit mode 값 재설정하기
                </button>
                <button onClick={onTurnOffLimitMode}>limit mode 끄기</button>
                <button onClick={onCancel}>Cancel</button>
              </>
            )}
          </>
        ) : (
          <button onClick={onModeToggle}>limit mode 재설정하기</button>
        )
      ) : // normal mode
      modeToggle ? (
        //  time limit 시간 설정하기 (같음)
        <>
          <Select onChange={onModeSelect} options={timeLimitOptions} />
          <button onClick={onCancel}>Cancel</button>
        </>
      ) : (
        <button onClick={onModeToggle}>limit mode 켜기</button>
      )}
      */
