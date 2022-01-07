import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { PostViewerProps } from './PostViewer';

export const PostViewerWrapper = styled.div<PostViewerProps>`
  width: 100%;
  overflow-y: auto;
  overflow-wrap: break-word;
  text-align: left;
  position: relative;

  .nodeRoute {
    display: inline-block;
    color: ${theme.colors.gray.base};
    font-size: 0.9em;
    font-weight: ${theme.fonts.weight.normal};
    margin: 0 0 1em 1em;

    &:hover {
      text-decoration: underline;
      color: ${theme.colors.gray.dark};
    }
  }

  .postTitleText {
    padding: 0.8em 0 0.8em 0;

    p {
      padding-left: 0.8em;
    }

    a {
      padding: 0.8em;

      &:hover {
        color: ${theme.colors.secondary.base};
        text-decoration: underline;
      }
    }
  }

  .editDeleteBtns {
    position: absolute;
    top: 0.5em;
    right: 1em;
    width: fit-content;
    font-size: 0.8em;
  }

  .mdViewer {
    padding: 1em;
  }

  .postTitleText {
    font-weight: ${theme.fonts.weight.bold};
    font-size: 1.1em;

    ${({ post }) =>
      post.title &&
      css`
        &:after {
          ${theme.defElem.divider()}
          margin-top: 0.5em;
        }
      `}
  }

  ul {
    font-size: 80%;
    padding: 0.5em 1em;
  }
`;
