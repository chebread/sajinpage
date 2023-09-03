import offLimitedMode from 'api/offLimitedMode';
import fileDbAtom from 'atoms/fileDbAtom';
import { onCancelAtom, resetToggleAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { disableTab, transition } from 'layouts/properties';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { ReactComponent as CancelIcon } from 'assets/svg/CancelIcon.svg';
import ModalHeader from 'components/Modal/ModalHeader';
import Modal from 'components/Modal';
import ModalCancelBtn from 'components/Modal/ModalCancelBtn';
import ModalWrapper from 'components/Modal/ModalWrapper';

// limited mode에서 나오는 Modal

const EditModeModal = ({ visible }) => {
  const [fileDb] = useAtom(fileDbAtom);
  const [resetToggle, setResetToggle] = useAtom(resetToggleAtom);
  const [, onCancel] = useAtom(onCancelAtom);

  const onResetToggle = () => {
    setResetToggle(!resetToggle);
  };
  const offMode = async () => {
    await offLimitedMode({
      docId: fileDb.docId,
      fileId: fileDb.fileId,
      uploadType: fileDb.uploadType,
    })
      .then(() => {
        toast('제한모드 꺼짐');
      })
      .catch(() => {
        toast.error('제한모드 끄기 중 에러발생');
      });
    onCancel();
  };

  return (
    <Modal onBack={onCancel} visible={visible}>
      <ModalHeader>
        <ModalCancelBtn onClick={onCancel}>
          <CancelIcon />
        </ModalCancelBtn>
      </ModalHeader>
      <ModalWrapper>
        <Button onClick={onResetToggle}>제한모드 시간 재설정</Button>
        <Button onClick={offMode}>제한모드 끄기</Button>
      </ModalWrapper>
    </Modal>
  );
};

const Button = styled.button`
  all: unset;
  ${disableTab}
  ${transition('all')}
  cursor: pointer;
  padding: 1.5rem 1.25rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: rgb(245, 245, 245);
  &:active {
    background-color: rgb(235, 235, 235);
    transform: scale(0.98);
  }
  svg {
    height: 1.5rem;
  }
`;

export default EditModeModal;
