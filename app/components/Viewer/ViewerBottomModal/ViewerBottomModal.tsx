import {
  editClickedAtom,
  modeToggleAtom,
  onCancelAtom,
  resetToggleAtom,
} from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { centerAlign, desktopVp, disableTab } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import styled from 'styled-components';
import fileDbAtom from 'atoms/fileDbAtom';
import onDeleteFile from 'components/onDeleteFile';
import getUrl from 'lib/getUrl';
import timeLimitOptionsAtom from 'atoms/timeLimitOptionsAtom';
import { useRef } from 'react';
import onCopy from 'components/onCopy';
import onLimitedMode from 'api/onLimitedMode';
import { toast } from 'react-hot-toast';
import offLimitedMode from 'api/offLimitedMode';

// for mobile

const EditBottomModal = () => {
  const [editClicked, setEditClicked] = useAtom(editClickedAtom);
  const [fileDb] = useAtom(fileDbAtom);
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);
  const [modeToggle, setModeToggle] = useAtom(modeToggleAtom);
  const [resetToggle, setResetToggle] = useAtom(resetToggleAtom);
  const [, onCancel] = useAtom(onCancelAtom);
  const currentDatetime = useRef(
    new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 19)
  );

  const onModeToggle = () => {
    setModeToggle(!modeToggle);
  };
  const onResetToggle = () => {
    setResetToggle(!resetToggle);
  };
  const onSelectMode = async (e: any) => {
    // turn on limit mode
    const {
      target: { value },
    } = e; // value is timeLimit
    if (value) {
      const timeLimit: number = Number(value); // value is string type
      await onLimitedMode({
        timeLimit: timeLimit,
        docId: fileDb.docId,
        fileId: fileDb.fileId,
        uploadType: fileDb.uploadType,
      }).catch(() => {
        toast.error('Turn on limited mode error');
      });
      onCancel();
    }
  };
  const offMode = async () => {
    await offLimitedMode({
      docId: fileDb.docId,
      fileId: fileDb.fileId,
      uploadType: fileDb.uploadType,
    }).catch(() => {
      toast.error('Turn off limited mode error');
    });
    onCancel();
  };
  return (
    <>
      <Container>
        <Background visible={editClicked} onClick={onCancel} />
        <>
          <ContainerX visible={editClicked}>
            <button
              onClick={async () => {
                await onCopy(getUrl());
                onCancel();
              }}
            >
              Share
            </button>
            <button onClick={() => onDeleteFile(fileDb.docId)}>
              delete file
            </button>
            {fileDb.limit ? (
              // limit mode
              modeToggle ? (
                <>
                  {resetToggle ? (
                    //  time limit 시간 설정하기 (같음)
                    <>
                      {/* <Select
                        onChange={onModeSelect}
                        options={timeLimitOptions}
                      /> */}
                      <button onClick={onCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={onResetToggle}>
                        limit mode 값 재설정하기
                      </button>
                      <button onClick={offMode}>limit mode 끄기</button>
                      <button onClick={onCancel}>Cancel</button>
                    </>
                  )}
                </>
              ) : (
                <button onClick={onResetToggle}>limit mode 재설정하기</button>
              )
            ) : // normal mode
            modeToggle ? (
              //  time limit 시간 설정하기 (같음)
              <>
                {/* <Select onChange={onModeSelect} options={timeLimitOptions} /> */}
                <button onClick={onCancel}>Cancel</button>
              </>
            ) : (
              <button onClick={onModeToggle}>limit mode 켜기</button>
            )}
          </ContainerX>
        </>
      </Container>
    </>
  );
};

const Container = styled.div`
  ${transition('all')}
  visibility: visible;
  opacity: 1;
  z-index: -1;
  @media (${desktopVp}) {
    visibility: hidden;
    opacity: 0;
  }
`;

const Background = styled.div<{ visible: boolean }>`
  ${transition('all')}
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  z-index: ${({ visible }) => (visible ? '1' : '-1')};
  @media (${desktopVp}) {
    visibility: hidden;
    opacity: 0;
    z-index: -1;
  }
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ContainerX = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 0;
  height: 20%;
  width: 100%;
  z-index: 100000;
  transform-origin: 0 100%;
  ${transition('transform')}
  transform: ${({ visible }) =>
    visible ? 'translateY(0)' : 'translateY(100%)'};
  @media (${desktopVp}) {
    transform: translateY(100%);
  }
  background-color: #fff;
`;

const Wrapper = styled.div`
  ${transition('all')}
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 1.5rem;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
`;
const Btn = styled.button`
  all: unset;
  ${disableTab}
  ${transition('all')}
  z-index: 10000;
  cursor: pointer;
  height: 3rem;
  width: 3rem;
  display: flex;
  ${centerAlign}
  border-radius: 50%;
  background-color: #1e1e1e;
  &:active {
    transform: scale(0.85);
    svg {
      transform: scale(0.85);
    }
  }
  svg {
    ${transition('transform')}
    height: 1rem;
    fill: #ffffff;
  }
  /* margin-bottom: 0.5rem; */
`;

export default EditBottomModal;
