import {
  isSelectedAtom,
  limitAtom,
  timeLimitAtom,
  timeLimitOptionsAtom,
} from 'atoms';
import { useAtom } from 'jotai';
import addTime from 'lib/addTime';
import dateToString from 'lib/dateToString';
import getCurrentTime from 'lib/getCurrentTime';
import Select from 'react-select';

// 파일 업로드 모드를 설정하는 부분

const SelectModes = () => {
  const [, setLimit] = useAtom(limitAtom);
  const [, setTimeLimit] = useAtom(timeLimitAtom);
  const [, setIsSelected] = useAtom(isSelectedAtom);
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);

  const onModeSelect = (e: any) => {
    const { value } = e; // value = sec
    // normal upload mode = e.value가 존재하지 않음
    // limit upload mode = e.value가 존재
    if (value) {
      // limit mode
      const currentTime = getCurrentTime();
      const timeLimit = dateToString(
        addTime({ currentTime: currentTime, sec: value })
      ); // time limit
      setTimeLimit(timeLimit); // 어차피 server에 저장하는 값이니 문자열로 저장해야하니 문자열로 치환함
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
