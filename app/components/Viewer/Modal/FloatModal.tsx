import { updateFiles } from 'api';
import fileDbAtom from 'atoms/fileDbAtom';
import timeLimitOptionsAtom from 'atoms/timeLimitOptionsAtom';
import {
  clickedAtom,
  modeToggleAtom,
  onCancelAtom,
  resetToggleAtom,
} from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { centerAlign, desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import addTime from 'lib/addTime';
import dateToString from 'lib/dateToString';
import getCurrentTime from 'lib/getCurrentTime';
import supabase from 'lib/supabase';
import Select from 'react-select';
import styled from 'styled-components';
import { ReactComponent as CancelIcon } from 'assets/svg/CancelIcon.svg';

const FloatModal = () => {
  const [fileDb] = useAtom(fileDbAtom);
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);
  const [modeToggle, setModeToggle] = useAtom(modeToggleAtom);
  const [resetToggle, setResetToggle] = useAtom(resetToggleAtom);
  const [, onCancel] = useAtom(onCancelAtom);

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
    onCancel();
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
      onCancel();
    }
  };

  return (
    <>
      {fileDb.limit ? (
        // (0): 이건 floatmodal을 2개가 아닌 1개로 하며, btn만 visible 감싸기!!! => 구분하자.
        <FloatModalsContainer visible={modeToggle}>
          <Select onChange={onModeSelect} options={timeLimitOptions} />
          <button onClick={() => setResetToggle(false)}>취소</button>

          <button onClick={onResetToggle}>limit mode 값 재설정하기</button>
          <button onClick={onTurnOffLimitMode}>limit mode 끄기</button>
          <button onClick={onCancel}>취소</button>
          <FloatModalsBackground onClick={onCancel} />
        </FloatModalsContainer>
      ) : (
        <>
          <FloatModalsContainer visible={modeToggle}>
            <FloatModals>
              <FloatModalsHeader>
                <CancelButton onClick={onCancel}>
                  <CancelIcon />
                </CancelButton>
              </FloatModalsHeader>
              <Select onChange={onModeSelect} options={timeLimitOptions} />
            </FloatModals>
            <FloatModalsBackground onClick={onCancel} />
          </FloatModalsContainer>
        </>
      )}
    </>
  );
};

const FloatModalsBackground = styled.div`
  display: block;
  ${transition('all')}
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: -1;
`;
const FloatModalsContainer = styled.div<{ visible?: boolean }>`
  ${transition('all')}
  visibility: hidden;
  opacity: 0;
  z-index: -1;
  @media (${desktopVp}) {
    visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    z-index: ${({ visible }) =>
      visible ? '1000000' : '-1'}; // modalcontainer모다는 항시 커야함
  }
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  ${centerAlign}
`;
const FloatModals = styled.div`
  position: fixed;
  height: 28rem;
  width: 600px;
  border-radius: 1rem;
  background-color: #ffffff;
  z-index: 1000000;
`;
const FloatModalsHeader = styled.div`
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  height: 53px;
  width: 100%;
  display: flex;
  align-items: center;
`;
const CancelButton = styled.button`
  all: unset;
  margin-left: 0.5rem;
  ${disableTab}
  ${transition('all')}
  z-index: 10000;
  cursor: pointer;
  height: 2rem;
  width: 2rem;
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  &:hover {
    background-color: rgb(235, 235, 235);
    svg {
      transform: scale(1.07);
    }
  }
  &:active {
    background-color: rgb(220, 220, 220);
    svg {
      transform: scale(0.98);
    }
  }
  svg {
    ${transition('transform')}
    height: 13px; // 1rem
    fill: #ffffff;
  }
`;

export default FloatModal;
