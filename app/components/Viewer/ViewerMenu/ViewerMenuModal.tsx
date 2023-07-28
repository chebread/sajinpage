import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import { useState } from 'react';
import timeLimitOptionsAtom from 'atoms/timeLimitOptionsAtom';
import onDelete from 'components/Viewer/onDelete';
import supabase from 'lib/supabase';
import addTime from 'lib/addTime';
import dateToString from 'lib/dateToString';
import getCurrentTime from 'lib/getCurrentTime';
import updateFiles from 'api/updateFiles';
import Select from 'react-select';
import getUrl from 'lib/getUrl';
import { useAtom } from 'jotai';
import fileDbAtom from 'atoms/fileDbAtom';
import { clickedAtom } from 'atoms/viewerAtom';
import CopyToClipboard from 'react-copy-to-clipboard';
import getWebsiteUrl from 'lib/getWebsiteUrl';

// mobile만

// delete btn
// turn on private mode btn
// turn off private mode btn
// reset time limit btn
// copy url btn

// (0): threads 모달 처럼 바꾸기

const ViewerMenuModal = () => {
  const [clicked, setClicked] = useAtom(clickedAtom);
  const [fileDb] = useAtom(fileDbAtom);
  const url = getUrl(); // current app url
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);
  const [modeToggle, setModeToggle] = useState(false);
  const [resetToggle, setResetToggle] = useState(false);
  console.log(clicked);

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

  return (
    <Container isVisible={clicked}>
      <CopyToClipboard
        text={getWebsiteUrl(`/v/${fileDb.docId}`)}
        onCopy={() => {
          // when copied
        }}
      >
        <button>Share</button>
      </CopyToClipboard>
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
    </Container>
  );
};

type ViewerMenuPropsType = {
  isVisible?: boolean;
};
const Container = styled.div<ViewerMenuPropsType>`
  position: fixed;
  bottom: 0;
  height: 20%;
  width: 100%;
  z-index: 10000;
  transform-origin: 0 100%;
  ${transition('transform')}
  transform: ${({ isVisible }) =>
    isVisible ? 'translateY(0)' : 'translateY(100%)'};
  background-color: #fff;
`;

export default ViewerMenuModal;
