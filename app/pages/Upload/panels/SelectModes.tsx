import { useAtom } from 'jotai';
import timeLimitOptionsAtom from 'atoms/timeLimitOptionsAtom';
import addTime from 'lib/addTime';
import dateToString from 'lib/dateToString';
import getCurrentTime from 'lib/getCurrentTime';
import filesAtom from 'atoms/filesAtom';
import initValuesAtom from 'atoms/initValuesAtom';
import Modal from 'components/Modal';
import styled from 'styled-components';
import { desktopVp, disableTab, transition } from 'layouts/properties';
import ModalHeader from 'components/Modal/ModalHeader';
import ModalCancelBtn from 'components/Modal/ModalCancelBtn';
import ModalWrapper from 'components/Modal/ModalWrapper';
import { ReactComponent as LeftArrowIcon } from 'assets/svg/LeftArrow.svg';

// 파일 업로드 모드를 설정하는 부분

const SelectModes = () => {
  const [, setFiles] = useAtom(filesAtom);
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);
  const [, initValues] = useAtom(initValuesAtom);

  const onModeSelect = (e: any) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'limited') {
      // limit mode
      const timeLimit: number = Number(value); // time limit = sec
      const currentTime = getCurrentTime();
      const accessTime = dateToString(
        addTime({ currentTime: currentTime, sec: timeLimit })
      ); // acessTime type = string
      setFiles(prevState => {
        return {
          ...prevState,
          accessTime: accessTime,
          timeLimit: timeLimit, // value는 시간초를 의미함
          limit: true,
        };
      });
    }
    // normal mode && limit mode 둘다 selected를 true로 설정합니다.
    setFiles(prevState => {
      return {
        ...prevState,
        selected: true, // 선택됨
      };
    });
  };

  const onBack = () => {
    initValues();
  };

  return (
    <Modal onBack={onBack}>
      <ModalHeader>
        <ModalCancelBtn onClick={onBack}>
          <LeftArrowIcon />
        </ModalCancelBtn>
      </ModalHeader>
      <ModalWrapper>
        <Button onClick={onModeSelect} name="normal">
          일반 업로드
        </Button>
        <Select onChange={onModeSelect} name="limited" defaultValue={'DEFAULT'}>
          <option value="DEFAULT" disabled>
            시간 선택
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
  @media (${desktopVp}) {
    &:hover {
      /* background-color: rgb(235, 235, 235); */
    }
  }
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
  @media (${desktopVp}) {
    &:hover {
      /* background-color: rgb(235, 235, 235); */
    }
  }
  &:active {
    background-color: rgb(235, 235, 235);
    transform: scale(0.98);
  }
  svg {
    height: 1.5rem;
  }
`;

export default SelectModes;
