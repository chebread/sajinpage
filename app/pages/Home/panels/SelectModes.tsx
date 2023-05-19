import {
  isSelectedAtom,
  limitAtom,
  timeLimitAtom,
  timeLimitOptionsAtom,
} from 'atoms';
import { useAtom } from 'jotai';
import Select from 'react-select';

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
