import themeVariables from './themeVariables';

const cssVar = (name: string) => `var(--${name.replace(/_/g, '-')})`;
const variableKeys = Object.keys(themeVariables.light);
const themedPalette = variableKeys.reduce((acc, current) => {
  acc[current] = cssVar(current);
  return acc;
}, {} as any);

export default themedPalette;
