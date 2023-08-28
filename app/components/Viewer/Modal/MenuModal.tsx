import fileDbAtom from 'atoms/fileDbAtom';
import {
  expandedAtom,
  menuClickedAtom,
  modeToggleAtom,
  onCancelAtom,
} from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { desktopVp, disableSelection, transition } from 'layouts/properties';
import getUrl from 'lib/getUrl';
import styled from 'styled-components';
import onCopy from 'components/onCopy';
import FloatModal from './FloatModal';
import onDeleteFile from 'components/onDeleteFile';

const MenuModal = () => {
  const [fileDb] = useAtom(fileDbAtom);
  const [menuClicked, setMenuClicked] = useAtom(menuClickedAtom);
  const [modeToggle, setModeToggle] = useAtom(modeToggleAtom);
  const [, onCancel] = useAtom(onCancelAtom);
  const [expanded] = useAtom(expandedAtom); // mobile에서 menu clicked시 expand이면 출력되는 현상을 막기 위해 사용함

  const onModeToggle = () => {
    setModeToggle(!modeToggle);
    // setMenuClicked(false); // 모바일에서도 mode toggle 되기에 menuModal은 최소화 하지 않음 => (0): mode, reset Toggle은 모바일과 공유하지 않아도 될 것 같은데... 일단 최소화 하지는 않는데 일단 생각은 해보자
  };

  return (
    <>
      <MenuModalsContainer visible={menuClicked} expanded={expanded}>
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
            await onDeleteFile(fileDb.docId);
            onCancel();
          }}
        >
          <MenuModalsWrapper>삭제</MenuModalsWrapper>
        </MenuModals>
      </MenuModalsContainer>
      {/* (0): 수정필요 */}
      <MenuModalsBackground
        visible={menuClicked}
        expanded={expanded}
        onClick={onCancel}
      />
      <FloatModal />
    </>
  );
};

const MenuModalsBackground = styled.div<{
  visible: boolean;
  expanded: boolean;
}>`
  display: block;
  ${transition('all')}
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: ${({ visible, expanded }) =>
    visible ? (expanded ? -1 : 10000) : '-1'};
  visibility: ${({ visible, expanded }) =>
    visible ? (expanded ? 'hidden' : 'visible') : 'hidden'};
  opacity: ${({ visible, expanded }) => (visible ? (expanded ? 0 : 1) : 0)};
  // (0): z-index: 10000시 버튼이 왜 안먹힐까?
`;
const MenuModalsContainer = styled.div<{
  visible: boolean;
  expanded: boolean;
}>`
  ${transition('all')}
  cursor: pointer;
  visibility: hidden;
  opacity: 0;
  z-index: -1;
  @media (${desktopVp}) {
    visibility: ${({ visible, expanded }) =>
      visible ? (expanded ? 'hidden' : 'visible') : 'hidden'};
    opacity: ${({ visible, expanded }) => (visible ? (expanded ? 0 : 1) : 0)};
    z-index: ${({ visible, expanded }) =>
      visible ? (expanded ? -1 : '100000') : '-1'};
  }
  position: fixed;
  right: 0;
  top: 0;
  margin: 4rem 3rem;
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
    color: #ff2f40;
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
