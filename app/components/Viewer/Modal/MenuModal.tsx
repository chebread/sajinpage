import { deleteFiles } from 'api';
import fileDbAtom from 'atoms/fileDbAtom';
import { clickedAtom, modeToggleAtom, onCancelAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { desktopVp, disableSelection } from 'layouts/properties';
import transition from 'layouts/properties/transition';
import copyText from 'lib/copyText';
import getWebsiteUrl from 'lib/getWebsiteUrl';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import FloatModal from './FloatModal';

const MenuModal = () => {
  const [fileDb] = useAtom(fileDbAtom);
  const [clicked, setClicked] = useAtom(clickedAtom);
  const [modeToggle, setModeToggle] = useAtom(modeToggleAtom);
  const [, onCancel] = useAtom(onCancelAtom);

  const onModeToggle = () => {
    setModeToggle(!modeToggle);
  };
  const onCopy = async () => {
    const text = getWebsiteUrl(`/v/${fileDb.docId}`);
    await copyText(text)
      .then(() => {
        toast.success('Copied');
      })
      .catch(() => {
        toast.error('Copy error');
      });
    onCancel();
  };
  const onDelete = async () => {
    await deleteFiles(fileDb.docId)
      .then(() => {
        toast.success('delete file');
      })
      .catch(() => {
        toast.error('파일 삭제중 오류 발생');
      });
    onCancel();
  };
  return (
    <>
      <MenuModalsContainer visible={clicked}>
        <MenuModals onClick={onCopy}>
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
        <MenuModals onClick={onDelete}>
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
  z-index: ${({ visible }) => (visible ? '10000' : '-1')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
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
  margin-right: 3rem;
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
