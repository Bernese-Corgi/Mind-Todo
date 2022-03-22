import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledTodosByDateArticle = styled.article`
  text-align: left;
  margin: 0.5em;
  margin-bottom: 2em;

  h3 {
    color: ${theme.colors.secondary.base};
    font-weight: 600;
    margin-bottom: 0.5em;
    font-family: ${theme.fonts.family.base};
  }

  ul {
    /* border: 1px solid ${theme.colors.gray.light}; */
    background-color: ${theme.colors.primary.light}30;
    border-radius: 5px;
  }

  .todos {
    margin-bottom: 3em;
  }

  &:before {
    ${theme.defElem.divider()}
    margin-bottom: 1em;
  }
`;
