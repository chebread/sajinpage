import {
  isSelectedAtom,
  limitAtom,
  timeLimitAtom,
  timeLimitOptionsAtom,
} from 'atoms';
import { useAtom } from 'jotai';
import Select from 'react-select';

// 파일 업로드 모드를 설정하는 부분
const SelectModes = () => {
  const [, setLimit] = useAtom(limitAtom);
  const [, setTimeLimit] = useAtom(timeLimitAtom);
  const [, setIsSelected] = useAtom(isSelectedAtom);
  const [timeLimitOptions] = useAtom(timeLimitOptionsAtom);

  const onModeSelect = async (e: any) => {
    // (0): 안정적이게 e.target.value === normal 로서 로직을 구현하기
    const { value } = e;
    // normal upload mode = e.value가 undefined임 / limit upload mode = e.value 존재
    if (value) {
      // limit upload mode
      // limit mode의 값들을 지정해주며, timeLimit에는 현재 업로드된 시간과 제한모드 활성화 시간을 더한 시간의 끝시간을 각각저장함
      setTimeLimit(value);
      setLimit(true);
    }
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
