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
import DesktopSelectModes from 'components/SelectModes/DesktopSelectModes';
import MobileSelectModes from 'components/SelectModes/MobileSelectModes';

// 파일 업로드 모드를 설정하는 부분

// (0): 날짜로 제한모드 시간 정하는 기능 추가하기

const SelectModes = () => {
  const [, setFiles] = useAtom(filesAtom);
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);
  const [, initValues] = useAtom(initValuesAtom);

  const onSelectMode = (e: any) => {
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

  return (
    <>
      <DesktopSelectModes onSelectMode={onSelectMode} />
      <MobileSelectModes onSelectMode={onSelectMode} />
    </>
  );
};

export default SelectModes;
