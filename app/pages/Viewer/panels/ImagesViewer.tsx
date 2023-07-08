import { useEffect, useRef, useState } from 'react';
import getUrl from 'lib/getUrl';
import styled from 'styled-components';
import updateFiles from 'api/updateFiles';
import Select from 'react-select';
import { useAtom } from 'jotai';
import { fileDbAtom, timeLimitOptionsAtom } from 'atoms';
import onDelete from 'components/Viewer/onDelete';
import supabase from 'components/supabase';

const ImagesViewer = ({ endedSession }) => {
  const [fileDb] = useAtom(fileDbAtom);
  const url = useRef(getUrl()); // current app url
  const docId = fileDb.docId;
  const fileId = fileDb.fileId;
  const src = fileDb.url;
  const limit = fileDb.limit;
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
      .getPublicUrl(fileId);
    const url = fileUrl.publicUrl;
    // update files
    await updateFiles({
      docId: docId,
      url: url,
      limit: false,
    }).catch(error => {
      console.log(error);
    });
    initValues();
  };
  const onModeSelect = async (e: any) => {
    // turn on limit mode
    const { value } = e; // value is timeLimit
    if (value) {
      const { data: fileUrl, error: fileUrlError }: any = await supabase.storage
        .from('images')
        .createSignedUrl(fileId, value);
      // signed url error checking
      if (fileUrlError) {
        // an error occurs
        throw new Error('file signed url 생성중 오류 발생');
      }
      const url = fileUrl.signedUrl;
      // update file
      await updateFiles({
        docId: docId,
        url: url,
        limit: true,
      }).catch(error => {
        console.log(error);
      });
      initValues();
    }
  };

  // 기능을 작동시키는 버튼만 존재. 버튼의 component는 따로 구현
  return (
    <>
      <Img
        src={src}
        onError={() => {
          // 처음 로드하여 세션 초과확인
          console.log(1);
          endedSession();
        }}
      />
      <button onClick={() => onDelete(docId)}>delete file</button>
      {limit ? (
        // limit mode
        modeToggle ? (
          <>
            {resetToggle ? (
              //  time limit 시간 설정하기 (같음)
              <Select onChange={onModeSelect} options={timeLimitOptions} />
            ) : (
              <>
                <button onClick={onResetToggle}>
                  limit mode 값 재설정하기
                </button>
                <button onClick={onTurnOffLimitMode}>limit mode 끄기</button>
              </>
            )}
          </>
        ) : (
          <button onClick={onModeToggle}>limit mode 재설정하기</button>
        )
      ) : // normal mode
      modeToggle ? (
        //  time limit 시간 설정하기 (같음)
        <Select onChange={onModeSelect} options={timeLimitOptions} />
      ) : (
        <button onClick={onModeToggle}>limit mode 켜기</button>
      )}
    </>
  );
};

const Img = styled.img`
  width: 300px;
  height: 300px;
`;

export default ImagesViewer;
