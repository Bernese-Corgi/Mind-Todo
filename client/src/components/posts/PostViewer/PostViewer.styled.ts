import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { PostViewerProps } from './PostViewer';

export const PostViewerWrapper = styled.div<PostViewerProps>`
  width: 100%;
  overflow-y: auto;
  overflow-wrap: break-word;
  text-align: left;
  position: relative;

  .postTitleText {
    padding: 0.8em;
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
