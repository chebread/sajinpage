import { deleteFiles, updateFiles } from 'api';
import clientChannels from 'api/createClients';
import fileDbAtom from 'atoms/fileDbAtom';
import { clickedAtom, modeToggleAtom, onCancelAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { desktopVp, disableSelection } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import getUrl from 'lib/getUrl';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import onCopy from '../onCopy';
import FloatModal from './FloatModal';

const MenuModal = () => {
  const [fileDb] = useAtom(fileDbAtom);
  const [clicked, setClicked] = useAtom(clickedAtom);
  const [modeToggle, setModeToggle] = useAtom(modeToggleAtom);
  const [, onCancel] = useAtom(onCancelAtom);

  const onModeToggle = () => {
    setModeToggle(!modeToggle);
    setClicked(false); // menuModal 최소화
  };

  const onDelete = async (docId: string) => {
    await deleteFiles(docId)
      .then(() => {
        toast.success('delete file');
      })
      .catch(() => {
        toast.error('파일 삭제중 오류 발생');
      });
  };

  return (
    <>
      <MenuModalsContainer visible={clicked}>
        <MenuModals
          onClick={async () => {
            await updateFiles({
              docId: fileDb.docId,
              fileType: 'hellox',
            });
            onCancel();
          }}
        >
          <MenuModalsWrapper>Test</MenuModalsWrapper>
        </MenuModals>
        <MenuModals
          onClick={async () => {
            await onCopy(getUrl());
            onCancel();
          }}
        >
          <MenuModalsWrapper>링크 복사</MenuModalsWrapper>
        </MenuModals>
        {fileDb.limit ? (
          <>
            <MenuModals onClick={onModeToggle}>
              <MenuModalsWrapper>제한모드 재설정</MenuModalsWrapper>
            </MenuModals>
          </>
        ) : (
          // normal mode
          <>
            <MenuModals onClick={onModeToggle}>
              <MenuModalsWrapper>제한모드 켜기</MenuModalsWrapper>
            </MenuModals>
          </>
        )}
        <MenuModals
          onClick={async () => {
            await onDelete(fileDb.docId);
            const channel = clientChannels().channel('broadcast');
            channel.subscribe(status => {
              if (status === 'SUBSCRIBED') {
                channel.send({
                  type: 'broadcast',
                  event: 'DELETE',
                  payload: {
                    docId: fileDb.docId,
                  },
                });
              }
            });
            onCancel();
          }}
        >
          <MenuModalsWrapper>삭제</MenuModalsWrapper>
        </MenuModals>
      </MenuModalsContainer>
      {/* (0): 수정필요 */}
      <MenuModalsBackground visible={clicked} onClick={onCancel} />
      <FloatModal />
    </>
  );
};

const MenuModalsBackground = styled.div<{ visible: boolean }>`
  display: block;
  ${transition('all')}
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: ${({ visible }) => (visible ? '1' : '-1')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  // (0): z-index: 10000시 버튼이 왜 안먹힐까?
`;
const MenuModalsContainer = styled.div<{ visible: boolean }>`
  ${transition('all')}
  cursor: pointer;
  visibility: hidden; // mobile은 다른 하단 modal이 튀어나옴!
  opacity: 0;
  z-index: -1;
  @media (${desktopVp}) {
    visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    z-index: ${({ visible }) => (visible ? '100000' : '-1')};
  }
  position: fixed;
  right: 0;
  top: 0;
  margin-right: 3rem;
  margin-top: 4rem;
  box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08);
  border: 0.5px solid rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 1rem;
`;
const MenuModals = styled.div`
  ${transition('all')}
  height: 3rem;
  width: 10rem;
  display: flex;
  align-items: center;
  &:first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  &:last-child {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
  &:not(:last-child) {
    border-bottom: rgba(0, 0, 0, 0.15) 0.5px solid;
  }
  ${disableSelection}
  font-weight: 600;
  &:last-child {
    color: #ff2f40; // #e03131
  }
  @media (${desktopVp}) {
    &:hover {
      background-color: rgb(235, 235, 235);
    }
  }
  &:active {
    background-color: rgb(220, 220, 220);
  }
`;
const MenuModalsWrapper = styled.div`
  padding-left: 1rem;
`;

export default MenuModal;
