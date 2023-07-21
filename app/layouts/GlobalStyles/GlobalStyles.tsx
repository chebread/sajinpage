import { disabledScrollbar } from 'layouts/properties';
import { createGlobalStyle } from 'styled-components';
import { appThemes, themedPalette } from 'layouts/themes';
import initStyles from './initStyles';
import buildCssVariables from 'lib/buildCssVariables';
import { cssVars } from 'layouts/cssVars';

// 770px 이하: mobile
// 1200 이하: tablet and desktop
// 1200 이상: only desktop

// 960 이하: table & mobile
// 960 이상: desktop

const GlobalStyles = createGlobalStyle`
  // init styles
  ${initStyles}
  // init css vars
  body {
    ${buildCssVariables(cssVars)}
  }
  // init app's theme
  body {
    ${appThemes.light};
  }
  @media (prefers-color-scheme: dark) {
    body {
      ${appThemes.dark}
    }
  }
  // init typo
  body {
    font-family:  system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, Tossface; // "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
  }
  // defaults
  html, body, #root {
    // screen
    position: relative;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    // background
    background-color: white; // ${themedPalette.background}
    // font
    color: #000; // ${themedPalette.color}
    font-weight: 500;
    // scrollbar
    ${disabledScrollbar}
  }
`;

export default GlobalStyles;
