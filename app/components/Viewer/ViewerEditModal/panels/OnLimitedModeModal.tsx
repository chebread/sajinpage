import onLimitedMode from 'api/onLimitedMode';
import fileDbAtom from 'atoms/fileDbAtom';
import timeLimitOptionsAtom from 'atoms/timeLimitOptionsAtom';
import { onCancelAtom } from 'atoms/viewerAtom';
import { useAtom } from 'jotai';
import { disableTab, transition } from 'layouts/properties';
import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { ReactComponent as CancelIcon } from 'assets/svg/CancelIcon.svg';
import Modal from 'components/Modal';
import ModalHeader from 'components/Modal/ModalHeader';
import ModalCancelBtn from 'components/Modal/ModalCancelBtn';
import ModalWrapper from 'components/Modal/ModalWrapper';

// normal mode에서 나오는 Modal

const OnLimitedModeModal = ({ visible }) => {
  const selectRef = useRef<any>(null);
  const [fileDb] = useAtom(fileDbAtom);
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);
  const [, onCancel] = useAtom(onCancelAtom);

  useEffect(() => {
    if (visible) {
      // visible이 true라는 것은 컴포넌트가 화면에 보여질때임
      selectRef.current.selectedIndex = 0; // 화면에 보여지면 즉시 select tag의 selected 된 것 초기화
    }
  }, [visible]);

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
      })
        .then(() => {
          toast('제한모드 켜짐');
        })
        .catch(() => {
          toast.error('제한모드 켜기 중 에러발생');
        });
      onCancel();
    }
  };

  return (
    <Modal onBack={onCancel} visible={visible}>
      <ModalHeader>
        <ModalCancelBtn onClick={onCancel}>
          <CancelIcon />
        </ModalCancelBtn>
      </ModalHeader>
      <ModalWrapper>
        <Select
          ref={selectRef}
          onChange={onSelectMode}
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
      </ModalWrapper>
    </Modal>
  );
};

const Select = styled.select`
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

export default OnLimitedModeModal;
