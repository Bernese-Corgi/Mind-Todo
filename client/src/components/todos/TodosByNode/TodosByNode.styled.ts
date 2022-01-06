import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledTodosByNodeArticle = styled.article`
  text-align: left;
  margin: 0.5em;
  margin-bottom: 1.5em;

  h3 {
    color: ${theme.colors.gray.dark};
    font-weight: 600;
    margin-bottom: 0.5em;
  }

  time {
    display: block;
    font-size: 0.8em;
    margin-bottom: 0.5em;
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
`;
