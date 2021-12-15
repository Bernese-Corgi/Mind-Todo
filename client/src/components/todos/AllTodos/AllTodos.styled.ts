import styled from 'styled-components';
import theme from 'styles/theme';

export const AllTodosWrapper = styled.div`
  font-size: ${theme.fonts.size.sm};
  padding: 2em;

  .allTodosTitle {
    font-size: 1.3em;
    margin: 0.5em;
    text-align: left;
    color: ${theme.colors.primary.dark}99;
  }

  ul {
    .uncompletedList,
    .completedList {
      width: 100%;
      margin: 1em;
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