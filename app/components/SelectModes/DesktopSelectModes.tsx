import initValuesAtom from 'atoms/initValuesAtom';
import timeLimitOptionsAtom from 'atoms/timeLimitOptionsAtom';
import Modal from 'components/Modal';
import ModalCancelBtn from 'components/Modal/ModalCancelBtn';
import ModalHeader from 'components/Modal/ModalHeader';
import ModalWrapper from 'components/Modal/ModalWrapper';
import { useAtom } from 'jotai';
import { disableTab, transition } from 'layouts/properties';
import styled from 'styled-components';
import { ReactComponent as LeftArrowIcon } from 'assets/svg/LeftArrow.svg';
import { useNavigate } from 'react-router-dom';
import { linkUploaderClickedAtom } from 'atoms/uploaderAtom';

const DesktopSelectModes = ({ onSelectMode }) => {
  const navigate = useNavigate();
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);
  const [, initValues] = useAtom(initValuesAtom);
  const [, setClicked] = useAtom(linkUploaderClickedAtom);

  return (
    <Modal
      onBack={() => {
        initValues();
        navigate(-1);
        setClicked(false);
      }}
    >
      <ModalHeader>
        <ModalCancelBtn onClick={initValues}>
          <LeftArrowIcon />
        </ModalCancelBtn>
      </ModalHeader>
      <ModalWrapper>
        <Button onClick={onSelectMode} name="normal">
          일반 업로드
        </Button>
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

export default DesktopSelectModes;
