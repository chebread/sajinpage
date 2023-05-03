import { DisabledScrollbar } from 'layouts/properties';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    // font-family
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  }
  
  html, body, #root {
    // screen
    position: relative;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    // font
    color: #000;
    font-weight: 600;
    // cursur
    cursor: text;
    // scrollbar
    ${DisabledScrollbar}
  }



  /* ::selection {
    background-color: rgb(7, 238, 0, 99.9999999999999%); // 99%: 사파리 대응을 위해 반투명 설정함
    color: #000;
  } */


  // 770px 이하: mobile
  // 770px: tablet and desktop
  // 1200: only desktop
`;

export default GlobalStyles;
