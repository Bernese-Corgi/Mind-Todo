import styled from 'styled-components';
import theme from 'styles/theme';

export const AllTodosWrapper = styled.div`
  font-size: ${theme.fonts.size.sm};
  padding: 2em;

  .allTodosTitle {
    font-size: 1.3em;
    margin: 0 0 1em 0;
    text-align: left;
    color: ${theme.colors.primary.dark}99;
  }

  ul {
    .uncompletedList,
    .completedList {
      width: 100%;
      margin: 0.2em;
    }
    ${({ theme }) => theme.media.desktop`
      ${theme.flexes.mixin('row', 'start', 'start')}
    `}
    ${({ theme }) => theme.media.tablet`
      ${theme.flexes.mixin('row', 'start', 'start')}
    `}
    ${({ theme }) => theme.media.mobile`
      ${theme.flexes.mixin('column', 'start', 'start')} 
    `}
  }
`;
