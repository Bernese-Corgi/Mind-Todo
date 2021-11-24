import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { PostViewerProps } from './PostViewer';

export const PostViewerWrapper = styled.div<PostViewerProps>`
  width: 100%;
  overflow-y: auto;
  overflow-wrap: break-word;
  text-align: left;

  .postTitleText {
    padding: 0.8em;
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
          display: block;
          content: '';
          background-color: ${theme.colors.gray.dark}40;
          margin-top: 0.5em;
          width: 95%;
          height: 1px;
        }
      `}
  }
`;
