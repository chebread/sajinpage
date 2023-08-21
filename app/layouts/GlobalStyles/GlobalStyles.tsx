import { desktopVp, disableScrollbar } from 'layouts/properties';
import { createGlobalStyle } from 'styled-components';
import { appThemes, themeVars } from 'layouts/themes';
import initStyles from './initStyles';
import appCssVars from 'layouts/cssVars/appCssVars';

// (0): ios x 이상 시리즈 노치 대응하기

const GlobalStyles = createGlobalStyle`
  // init styles
  ${initStyles}
  // css variables
  body {
    ${appCssVars.mobile}
  }
  @media (${desktopVp}) {
    body {
      ${appCssVars.desktop}
    }
  }
  // theme
  body {
    ${appThemes.light};
  }
  @media (prefers-color-scheme: dark) {
    body {
      ${appThemes.dark}
    }
  }
  // fonts
  body {
    font-family: -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif; // "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
  }
  html, body, #root {
    // screen
    position: relative;
    height: 100%;
    ${disableScrollbar}
    // background
    background-color: ${themeVars.light.background_color};
    // font
    color: ${themeVars.light.color};
    font-weight: 500;
  }
`;

export default GlobalStyles;
