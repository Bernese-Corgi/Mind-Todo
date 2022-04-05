import styled, { css } from 'styled-components';
import theme from 'styles/theme';

const defaultText = css`
  font-size: 1em;
  margin: 0.5em 0 0.5em 0;
  padding: 0;
`;

export const MdViewerWrapper = styled.article`
  font-size: 1em !important;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${theme.colors.primary.dark};
    margin: 1.2em 0 0.5em 0;
  }

  h1 {
    font-size: 1.5em;
  }
  h2 {
    font-size: 1.4em;
  }
  h3 {
    font-size: 1.3em;
  }
  h4 {
    font-size: 1.2em;
  }
  h5 {
    font-size: 1.1em;
  }

  li {
    ${defaultText}
    padding-left: 0.5em;
  }

  ol {
    li {
      list-style: decimal inside;
    }
  }

  ul {
    font-size: 1em;
    padding: 0;

    li {
      font-size: 1em;
      list-style: inside;
    }
  }

  p {
    ${defaultText}
  }

  a {
    color: ${theme.colors.blue}98;

    &:hover {
      color: ${theme.colors.blue};
      text-decoration: underline;
    }

    &:link {
      color: ${theme.colors.blue}98;
    }

    &:visited {
      color: ${theme.colors.gray.dark}98;
    }

    &:active {
      color: ${theme.colors.purple};
      text-decoration: underline;
    }
  }

  em {
    font-style: italic;
    color: ${theme.colors.primary.dark};
  }

  strong {
    font-weight: ${theme.fonts.weight.bold};
    color: ${theme.colors.primary.dark};
  }

  del {
    color: ${theme.colors.gray.base};
  }

  blockquote {
    background-color: ${theme.colors.gray.light}80;
    padding: 0.5em 1em;
    margin: 1em 0.3em;
  }

  mark {
    background-color: ${theme.colors.gray.base};
  }

  table {
    width: 100%;
    border-top: 1px solid ${theme.colors.gray.dark};
    border-collapse: collapse;
    margin: 1em 0.3em;
  }

  th,
  td {
    border-bottom: 1px solid ${theme.colors.gray.base};
    border-left: 1px solid ${theme.colors.gray.base};
    padding: 10px;
  }

  th {
    background-color: ${theme.colors.gray.light}70;
  }

  th:first-child,
  td:first-child {
    border-left: none;
  }
`;
