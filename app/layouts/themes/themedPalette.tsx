import stringToCssVar from 'lib/stringToCssVar';
import themeVariables from './themeVars';

// 이거의 원리는 theme에 따라 색상이 바뀌는 것임, 그냥 themeVars를 참조하고 싶으면 그냥 object에서 바로 불러오면 됨
const variableKeys = Object.keys(themeVariables.light);
const themedPalette = variableKeys.reduce((acc, current) => {
  acc[current] = stringToCssVar(current);
  return acc;
}, {} as any);

export default themedPalette;
