import { desktopVp } from 'layouts/properties';
import { createGlobalStyle } from 'styled-components';
import { appThemes, themeVars } from 'layouts/themes';
import initStyles from './initStyles';
import appCssVars from 'layouts/cssVars/appCssVars';

// 770px 이하: mobile
// 1200 이하: tablet and desktop
// 1200 이상: only desktop

// 960 이하: table & mobile
// 960 이상: desktop

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
  // defaults
  html, body, #root {
    // screen
    position: relative;
    height: 100%;
    /* margin: 0;
    padding: 0;
    box-sizing: border-box; */
    // background
    background-color: ${themeVars.light.background_color};
    // font
    color: ${themeVars.light.color};
    font-weight: 500;
  }
`;

export default GlobalStyles;
