import { useAtom } from 'jotai';
import Select from 'react-select';
import timeLimitOptionsAtom from 'atoms/timeLimitOptionsAtom';
import addTime from 'lib/addTime';
import dateToString from 'lib/dateToString';
import getCurrentTime from 'lib/getCurrentTime';
import filesAtom from 'atoms/filesAtom';
import initValuesAtom from 'atoms/initValuesAtom';

// 파일 업로드 모드를 설정하는 부분

const SelectModes = () => {
  const [files, setFiles] = useAtom(filesAtom);
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);
  const [, initValues] = useAtom(initValuesAtom);

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
      setFiles(prevState => {
        return {
          ...prevState,
          accessTime: accessTime,
          timeLimit: timeLimit, // value는 시간초를 의미함
          limit: true,
        };
      });
    }
    // normal mode && limit mode
    setFiles(prevState => {
      return {
        ...prevState,
        selected: true, // 선택됨
      };
    });
  };

  const onGoHome = () => {
    initValues();
  };

  return (
    <div>
      <h1>Normal upload mode</h1>
      <button onClick={onModeSelect} value="normal">
        Normal upload mode
      </button>
      <h1>Limit upload mode</h1>
      <Select onChange={onModeSelect} options={timeLimitOptions} />
      <h1>Navigator</h1>
      <button onClick={onGoHome}>Cancel</button>
    </div>
  );
};

export default SelectModes;
