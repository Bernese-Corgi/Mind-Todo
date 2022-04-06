import styled from 'styled-components';
import theme from 'styles/theme';

export const TodosByCompletedWrapper = styled.div`
  width: 100%;

  ${theme.flexes.mixin('row', 'flex-start', 'flext-start')}

  p {
    color: ${theme.colors.primary.dark}99;
    margin: 0.6em;
  }

  .uncompleted {
    width: 65%;
  }

  .completed {
    width: 35%;
  }

  .completed,
  .uncompleted {
    text-align: left;
    margin: 1em;
    ${theme.flexes.mixin('column', 'flex-start', 'flext-start')}

    ul {
      width: 100%;
      padding: 0.2em;
      ${theme.flexes.column('flex-start')}
      background-color: ${theme.colors.primary.xlight};
    }
  }
`;
