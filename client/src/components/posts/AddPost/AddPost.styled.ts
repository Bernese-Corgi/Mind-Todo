import styled, { css } from 'styled-components';
import theme from 'styles/theme';

const defaultStyle = css`
  .section {
    padding: 1em;

    .postEditorHeader {
      font-size: 1em;
      color: ${theme.colors.primary.dark}90;
      margin-bottom: 1em;
    }

    label {
      font-weight: ${theme.fonts.weight.bold};
    }
  }

  .mdEditorWrapper {
    height: 70%;

    #postBodyInput {
      height: 90%;
    }
  }

  .postViewer {
    background-color: ${theme.colors.primary.light}40;
    border-radius: ${theme.borders.radius.square};
  }
`;

const desktopAndTabletStyle = css`
  ${defaultStyle}
  ${theme.flexes.row('start')}
  height: 85vh;
  font-size: ${theme.fonts.size.base};
  padding: 1em;

  .section {
    width: 50%;
    height: 100%;

    margin-left: 0.5em;
    margin-right: 0.5em;

    ${theme.flexes.mixin('column', 'start', 'start')}
  }
`;

const mobileStyle = css`
  ${defaultStyle}
  ${theme.flexes.column('start')}
  min-width: 320px;
  font-size: ${theme.fonts.size.xs};

  .section {
    width: 100%;
    height: 350px;
    margin-bottom: 1em;

    ${theme.flexes.mixin('column', 'start', 'start')}
  }
`;

export const StyledAddPostArticle = styled.article`
  ${({ theme }) => theme.media.desktop`
    ${desktopAndTabletStyle}
`}
  ${({ theme }) => theme.media.tablet`
    ${desktopAndTabletStyle}
    font-size: ${theme.fonts.size.sm};
`}
  ${({ theme }) => theme.media.mobile`
    ${mobileStyle}
`}
`;
