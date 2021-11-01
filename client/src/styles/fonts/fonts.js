import { createGlobalStyle } from 'styled-components';
import RalewayFont from 'styles/fonts/raleway.woff';

export default createGlobalStyle`
  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    src: url(${RalewayFont}) (format('woff'));
  }
`;
