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
const avatarSkeleton = css`
  width: 100%;
  height: 100%;
  border-radius: ${theme.borders.radius.round};
`;

const todosSkeleton = css`
  width: 100%;
  height: 3em;
`;

export const StyledSkeletonElem = styled.div.attrs<StyledSkeletonElemProps>(
  ({ type }) => ({
    className: type,
  })
)<StyledSkeletonElemProps>`
  background-color: ${theme.colors.gray.light};
  margin: 1em 0;
  border-radius: ${theme.borders.radius.square};

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

      case 'todos':
        return css`
          ${todosSkeleton}
        `;

      default:
        return css`
          ${titleSkeleton}
        `;
    }
  }}
`;
