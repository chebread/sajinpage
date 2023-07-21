import buildCssVariables from 'lib/buildCssVariables';
import themeVariables from './themeVars'; // import { themeVariables } from 'layout/themes' 로는 접근할 수 없음을 유의

const appThemes = {
  light: buildCssVariables(themeVariables.light),
  dark: buildCssVariables(themeVariables.dark),
};

export default appThemes;
