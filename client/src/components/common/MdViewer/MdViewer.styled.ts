import styled, { css } from 'styled-components';
import theme from 'styles/theme';

export const MdViewerWrapper = styled.article``;

const defaultHGroupStyle = css`
  color: ${theme.colors.primary.dark};
  margin: 0.5em 0 0.5em 0;
`;

export const MdH1 = styled.h1`
  ${defaultHGroupStyle}
  font-size: 1.5em;
`;

export const MdH2 = styled.h2`
  ${defaultHGroupStyle}
  font-size: 1.4em;
`;

export const MdH3 = styled.h3`
  ${defaultHGroupStyle}
  font-size: 1.3em;
`;

export const MdH4 = styled.h4`
  ${defaultHGroupStyle}
  font-size: 1.2em;
`;

export const MdH5 = styled.h5`
  ${defaultHGroupStyle}
  font-size: 1.1em;
`;

export const MdH6 = styled.h6`
  ${defaultHGroupStyle}
`;
