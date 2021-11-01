import { createGlobalStyle } from 'styled-components';
import RalewayFont from 'styles/fonts/raleway.woff';
import NotoSansKr from 'styles/fonts/noto-sans-kr.woff';

export default createGlobalStyle`
  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    src: url(${RalewayFont}) (format('woff'));
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    src: url(${NotoSansKr}) (format('woff'));
  }
`;
