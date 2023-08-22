import { desktopVp } from 'layouts/properties';
import { createGlobalStyle } from 'styled-components';
import { appThemes, themeVars } from 'layouts/themes';
import initStyles from './initStyles';
import appCssVars from 'layouts/cssVars/appCssVars';

const GlobalStyles = createGlobalStyle`
  ${initStyles}
  body {
    ${appCssVars.mobile}
  }
  @media (${desktopVp}) {
    body {
      ${appCssVars.desktop}
    }
  }
  body {
    ${appThemes.light};
  }
  @media (prefers-color-scheme: dark) {
    body {
      ${appThemes.dark}
    }
  }
  body {
    font-family: -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif; // "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
  }
  html, body, #root {
    position: relative;
    height: 100%;
    background-color: ${themeVars.light.background_color};
    color: ${themeVars.light.color};
    font-weight: 500;
  }
`;

export default GlobalStyles;
