import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledTodosByNodeArticle = styled.article`
  text-align: left;
  margin: 0.5em;
  margin-bottom: 2em;

  h3 {
    color: ${theme.colors.gray.dark};
    font-weight: 600;
    margin-bottom: 0.5em;

    a:hover {
      text-decoration: underline;
      color: ${theme.colors.secondary.base};
    }
  }

  time {
    display: block;
    font-size: 0.8em;
    margin-bottom: 0.5em;
  }

  ul {
    /* border: 1px solid ${theme.colors.gray.light}; */
    background-color: ${theme.colors.primary.light}30;
    border-radius: 5px;
  }

  .title {
    margin-top: 1.5em;
    width: 80%;
  }

  .date {
    font-size: 0.8em;
  }

  .todos {
    margin-bottom: 3em;
  }

  &:before {
    ${theme.defElem.divider()}
    margin-bottom: 1em;
  }
`;
