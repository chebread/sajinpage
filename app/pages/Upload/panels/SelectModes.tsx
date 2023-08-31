import { useAtom } from 'jotai';
import timeLimitOptionsAtom from 'atoms/timeLimitOptionsAtom';
import addTime from 'lib/addTime';
import dateToString from 'lib/dateToString';
import getCurrentTime from 'lib/getCurrentTime';
import filesAtom from 'atoms/filesAtom';
import initValuesAtom from 'atoms/initValuesAtom';

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

  const onGoHome = () => {
    initValues();
  };

  return (
    <div>
      <h1>Normal upload mode</h1>
      <button onClick={onModeSelect} name="normal">
        Normal upload mode
      </button>
      <h1>Limit upload mode</h1>
      <select onChange={onModeSelect} name="limited">
        <option value={''}>시간 선택</option>
        {timeLimitOptions.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      <h1>Navigator</h1>
      <button onClick={onGoHome}>Cancel</button>
    </div>
  );
};

export default SelectModes;
