import {
  accessTimeAtom,
  isSelectedAtom,
  limitAtom,
  timeLimitAtom,
} from 'atoms/filesAtom';
import timeLimitOptionsAtom from 'atoms/timeLimitOptionsAtom';
import { useAtom } from 'jotai';
import addTime from 'lib/addTime';
import dateToString from 'lib/dateToString';
import getCurrentTime from 'lib/getCurrentTime';
import Select from 'react-select';

// 파일 업로드 모드를 설정하는 부분

// (0): 중도 포기할 수 있게 하기

const SelectModes = () => {
  const [, setLimit] = useAtom(limitAtom);
  const [, setTimeLimit] = useAtom(timeLimitAtom);
  const [, setAcessTime] = useAtom(accessTimeAtom);
  const [, setIsSelected] = useAtom(isSelectedAtom);
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);

  const onModeSelect = (e: any) => {
    const { value } = e; // value = limit sec
    // normal upload mode = e.value가 존재하지 않음
    // limit upload mode = e.value가 존재
    if (value) {
      // limit mode
      const timeLimit = value; // limit time = sec
      const currentTime = getCurrentTime();
      const accessTime = dateToString(
        addTime({ currentTime: currentTime, sec: timeLimit })
      ); // acessTime type = string
      setAcessTime(accessTime);
      setTimeLimit(timeLimit); // value는 시간초를 의미함
      setLimit(true);
    }
    // normal mode && limit mode
    setIsSelected(true); // 선택됨
  };

  return (
    <div>
      <h1>Normal upload mode</h1>
      <button onClick={onModeSelect} value="normal">
        Normal upload mode
      </button>
      <h1>Limit upload mode</h1>
      <Select onChange={onModeSelect} options={timeLimitOptions} />
    </div>
  );
};

export default SelectModes;
