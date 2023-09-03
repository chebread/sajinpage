import fileDbAtom from 'atoms/fileDbAtom';
import {
  expandedAtom,
  editClickedAtom,
  modeToggleAtom,
  onCancelAtom,
  resetToggleAtom,
  viewedAtom,
} from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { desktopVp, disableSelection, transition } from 'layouts/properties';
import getUrl from 'lib/getUrl';
import styled from 'styled-components';
import onCopy from 'components/onCopy';
import onDeleteFile from 'components/onDeleteFile';
import ViewerEditModal from '../ViewerEditModal';

// for desktop

const DesktopEditMenu = () => {
  const [viewed] = useAtom(viewedAtom);
  const [fileDb] = useAtom(fileDbAtom);
  const [editClicked] = useAtom(editClickedAtom);
  const [modeToggle, setModeToggle] = useAtom(modeToggleAtom);
  const [, onCancel] = useAtom(onCancelAtom);
  const [expanded] = useAtom(expandedAtom); // mobile에서 menu clicked시 expand이면 출력되는 현상을 막기 위해 사용함

  const onModeToggle = () => {
    setModeToggle(!modeToggle);
  };

  return (
    <>
      <MenuModalsContainer visible={editClicked && viewed} expanded={expanded}>
        <MenuModals
          onClick={async () => {
            await onCopy(getUrl());
            onCancel();
          }}
        >
          <MenuModalsWrapper>
            <span>공유</span>
          </MenuModalsWrapper>
        </MenuModals>

        <MenuModals onClick={onModeToggle}>
          <MenuModalsWrapper>
            <span>{fileDb.limit ? '제한모드 재설정' : '제한모드 켜기'}</span>
          </MenuModalsWrapper>
        </MenuModals>
        <MenuModals
          onClick={async () => {
            await onDeleteFile(fileDb.docId);
            onCancel();
          }}
        >
          <MenuModalsWrapper>
            <span>삭제</span>
          </MenuModalsWrapper>
        </MenuModals>
      </MenuModalsContainer>
      <MenuModalsBackground
        visible={editClicked}
        expanded={expanded}
        onClick={onCancel}
      />
      <ViewerEditModal />
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
  left: 0;
  bottom: 0;
  right: 0;
  display: none;
  z-index: -1;
  @media (${desktopVp}) {
    display: ${({ visible, expanded }) =>
      visible ? (expanded ? 'none' : 'block') : 'none'};
    z-index: ${({ visible, expanded }) =>
      visible
        ? expanded
          ? '-1'
          : '10000'
        : '-1'}; // (0): 전체 말고 button 들은 클릭할 수 있도록 바꾸기
  }
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
  font-weight: 500;
  font-size: 1rem;
  &:last-child {
    color: #ff2f40;
  }
  @media (${desktopVp}) {
    &:hover {
      /* background-color: rgb(235, 235, 235); */
    }
  }
  &:active {
    background-color: rgb(235, 235, 235);
  }
`;
const MenuModalsWrapper = styled.div`
  padding-left: 1rem;
`;

export default DesktopEditMenu;
