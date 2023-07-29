import buildCssVariables from 'lib/buildCssVariables';
import cssVars from './cssVars';

const appCssVars = {
  mobile: buildCssVariables(cssVars.mobile),
  desktop: buildCssVariables(cssVars.desktop),
};

export default appCssVars;
