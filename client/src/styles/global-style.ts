import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import theme from 'styles/theme';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  html {
    font-size: 10px;
    color: ${theme.colors.gray.dark};
  }
  body,
  body *,
  body::before,
  body::after,
  body *::before,
  body *::after {
    box-sizing: border-box;
  }
  body {
    background-color: #ffffff;
    font-family:  ${theme.fonts.family.base}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.family.title};
    font-weight: ${theme.fonts.weight.bold};
  }
  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
  input {
    font: inherit;
    /* font-size: 100%; */
    background: transparent;
    border: none;
    outline: none;
  }
  button {
    font: inherit;
    /* font-size: 100%; */
    user-select: none;
    cursor: pointer;
    /* outline: none; */
    background: transparent;
    border: none;
    margin: 0;
    padding: 0;
  }
  ol, ul, li {
    list-style: none;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  svg {
    color: ${theme.colors.gray.light};
  }
  textarea {
    resize: none;
    font: inherit;
    border: none;
    margin: 0;
    padding: 0;
    background: transparent;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }

  .a11yHidden {
    overflow: hidden;
    position: absolute;
    clip: rect(0 0 0 0);
    clip-path: polygon(0 0, 0 0, 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
    white-space: nowrap;
  }

/* error message ----------------------------- */
  .errorInput {
    ${theme.defElem.errInput}
  }

  .formErrorMsg {
    ${theme.defElem.errForm}
  }
`;

export default GlobalStyle;
