import stringToCssVar from 'lib/stringToCssVar';
import cssVars from './cssVars';

const variableKeys = Object.keys(cssVars.mobile);
const cssVarsPalette = variableKeys.reduce((acc, current) => {
  acc[current] = stringToCssVar(current);
  return acc;
}, {} as any);

export default cssVarsPalette;
