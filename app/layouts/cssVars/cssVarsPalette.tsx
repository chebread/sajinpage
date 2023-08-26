import stringToCssVar from 'lib/stringToCssVar';
import cssVars from './cssVars';

const variableKeys = [
  ...Object.keys(cssVars.mobile),
  ...Object.keys(cssVars.all), // for normal css variables
];
const cssVarsPalette = variableKeys.reduce((acc, current) => {
  acc[current] = stringToCssVar(current);
  return acc;
}, {} as any);

export default cssVarsPalette;
