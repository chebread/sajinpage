import {
  editClickedAtom,
  modeToggleAtom,
  onCancelAtom,
  resetToggleAtom,
} from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { desktopVp, disableTab } from 'layouts/properties';
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

  return fileDb.limit ? (
    modeToggle ? (
      resetToggle ? (
        <Container>
          <Wrapper visible={editClicked}>
            <Select
              onChange={onSelectMode}
              name="limited"
              defaultValue={'DEFAULT'}
            >
              <option value="DEFAULT" disabled>
                제한모드 시간 선택
              </option>
              {timeLimitOptions.map(option => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </Select>
            <Button onClick={onResetToggle}>취소</Button>
          </Wrapper>
          <Background visible={editClicked} onClick={onCancel} />
        </Container>
      ) : (
        <Container>
          <Wrapper visible={editClicked}>
            <Button onClick={onResetToggle}>제한모드 재설정하기</Button>
            <Button onClick={offMode}>제한모드 끄기</Button>
            <Button onClick={onModeToggle}>취소</Button>
          </Wrapper>
          <Background visible={editClicked} onClick={onCancel} />
        </Container>
      )
    ) : (
      <Container>
        <Wrapper visible={editClicked}>
          <Button
            onClick={async () => {
              await onCopy(getUrl());
              onCancel();
            }}
          >
            공유
          </Button>
          <Button onClick={onModeToggle}>제한모드 재설정하기</Button>
          <DeleteButton onClick={() => onDeleteFile(fileDb.docId)}>
            삭제
          </DeleteButton>
        </Wrapper>
        <Background visible={editClicked} onClick={onCancel} />
      </Container>
    )
  ) : modeToggle ? (
    // on limited
    <Container>
      <Wrapper visible={editClicked}>
        <Select onChange={onSelectMode} name="limited" defaultValue={'DEFAULT'}>
          <option value="DEFAULT" disabled>
            제한모드 시간 선택
          </option>
          {timeLimitOptions.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </Select>
        <Button onClick={onModeToggle}>취소</Button>
      </Wrapper>
      <Background visible={editClicked} onClick={onCancel} />
    </Container>
  ) : (
    <Container>
      <Wrapper visible={editClicked}>
        <Button
          onClick={async () => {
            await onCopy(getUrl());
            onCancel();
          }}
        >
          공유
        </Button>
        <Button onClick={onModeToggle}>제한모드 켜기</Button>
        <DeleteButton onClick={() => onDeleteFile(fileDb.docId)}>
          삭제
        </DeleteButton>
      </Wrapper>
      <Background visible={editClicked} onClick={onCancel} />
    </Container>
  );
};

const Select = styled.select`
  all: unset;
  ${disableTab}
  ${transition('all')}
  cursor: pointer;
  padding: 1.25rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: rgb(245, 245, 245);
  @media (${desktopVp}) {
    &:hover {
      /* background-color: rgb(235, 235, 235); */
    }
  }
  &:active {
    background-color: rgb(235, 235, 235);
    transform: scale(0.98);
  }
`;
const Button = styled.button`
  all: unset;
  ${disableTab}
  ${transition('all')}
  cursor: pointer;
  padding: 1.25rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: rgb(245, 245, 245);
  &:active {
    background-color: rgb(235, 235, 235);
    transform: scale(0.98);
  }
`;
const DeleteButton = styled(Button)`
  color: #ff2f40;
`;

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

const Wrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 0;
  height: auto;
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
  padding: 1rem 1rem 1rem 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

export default EditBottomModal;
