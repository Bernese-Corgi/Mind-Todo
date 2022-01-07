import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { SkeletonTypes } from './Skeleton';

interface StyledSkeletonElemProps {
  type: SkeletonTypes;
}

const textSkeleton = css`
  width: 100%;
  height: 1em;
`;

const titleSkeleton = css`
  width: 20%;
  height: 1em;
`;

const imgSkeleton = css`
  width: 100%;
  height: 100%;
`;

const dateSkeleton = css`
  width: 30%;
  height: 1em;
`;

const subInfoSkeleton = css`
  width: 30%;
  height: 1em;
`;

const avatarSkeleton = css`
  width: 100%;
  height: 100%;
  border-radius: ${theme.borders.radius.round};
`;

const todosSkeleton = css`
  width: 100%;
  height: 3em;
`;

const postSkeleton = css`
  width: 100%;
  height: 7em;
`;

const animation = css`
  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(460px);
    }
  }

  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 100%;

    background: -moz-linear-gradient(
      left,
      rgba(239, 239, 239, 0.1) 0%,
      rgba(255, 255, 255, 0.15) 40%,
      rgba(255, 255, 255, 0.15) 60%,
      rgba(239, 239, 239, 0.1) 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      left,
      rgba(239, 239, 239, 0.1) 0%,
      rgba(255, 255, 255, 0.15) 40%,
      rgba(255, 255, 255, 0.15) 60%,
      rgba(239, 239, 239, 0.1) 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to right,
      rgba(239, 239, 239, 0.1) 0%,
      rgba(255, 255, 255, 0.15) 40%,
      rgba(255, 255, 255, 0.15) 60%,
      rgba(239, 239, 239, 0.1) 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    animation: loading 1.5s infinite linear;
  }
`;

export const StyledSkeletonElem = styled.div.attrs<StyledSkeletonElemProps>(
  ({ type }) => ({
    className: type,
  })
)<StyledSkeletonElemProps>`
  background-color: ${theme.colors.gray.light};
  margin: 1em 0;
  border-radius: ${theme.borders.radius.square};

  ${animation}

  ${({ type }) => {
    switch (type) {
      case 'text':
        return css`
          ${textSkeleton}
        `;

      case 'title':
        return css`
          ${titleSkeleton}
        `;

      case 'img':
        return css`
          ${imgSkeleton}
        `;

      case 'date':
        return css`
          ${dateSkeleton}
        `;

      case 'subInfo':
        return css`
          ${subInfoSkeleton}
        `;

      case 'todos':
        return css`
          ${todosSkeleton}
        `;

      case 'post':
        return css`
          ${postSkeleton}
        `;

      default:
        return css`
          ${titleSkeleton}
        `;
    }
  }}
`;
