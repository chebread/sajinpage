import themeVariables from './themeVariables'; // import { themeVariables } from 'layout/themes' 로는 접근할 수 없음을 유의

const buildCssVariables = (variables: any) => {
  const keys = Object.keys(variables);
  return keys.reduce(
    (acc, key) =>
      acc.concat(`--${key.replace(/_/g, '-')}: ${variables[key]};`, '\n'),
    ''
  );
};
const appThemes = {
  light: buildCssVariables(themeVariables.light),
  dark: buildCssVariables(themeVariables.dark),
};

export default appThemes;
