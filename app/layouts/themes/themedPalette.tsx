import stringToCssVar from 'lib/stringToCssVar';
import themeVariables from './themeVars';

const variableKeys = Object.keys(themeVariables.light);
const themedPalette = variableKeys.reduce((acc, current) => {
  acc[current] = stringToCssVar(current);
  return acc;
}, {} as any);

export default themedPalette;
