import * as styledComponents from 'styled-components';

const {
  default: Styled,
  css,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<styledComponents.DefaultTheme>;

export { css, keyframes, ThemeProvider };

export default Styled;
