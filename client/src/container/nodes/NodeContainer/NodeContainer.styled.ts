import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledNodeContainerArticle = styled.article`
  /* desktop */
  /* TODO width, height 변경 */
  width: 90vw;
  height: 85vh;
  margin: 0 auto 0 auto;
  padding-top: 1em;
  ${theme.flexes.row('start')}
  font-size: ${theme.fonts.size.sm};

  h3 {
    font-size: 1.2em;
    margin-bottom: 0.5em;
  }

  h3::after {
    content: '';
    width: 15px;
    height: 100px;
    background-color: black;
    color: black;
  }

  .mindmapSection {
    ${theme.flexes.mixin('column', 'start', 'start')}
    min-width: 500px;
    width: 50%;
    height: 100%;
    padding: 1em;
  }

  .todoAndPostWrapper {
    width: 50%;
    height: 100%;
    border-left: 1px solid ${theme.colors.gray.light};
    padding-left: 1em;
  }

  .todosSection,
  .postSection {
    margin-bottom: 2em;
    padding-left: 1em;
    padding-bottom: 1em;
    ${theme.flexes.mixin('column', 'start', 'start')}
  }

  .todosSection {
    max-height: 30%;
    border-bottom: 1px solid ${theme.colors.gray.light};

    /* TODO todos 작성 후 변경 */
    ul {
      width: 100%;
      overflow: auto;
    }
  }

  .postSection {
    min-height: 70%;
    overflow: auto;
  }

  .postContent {
    width: 100%;
    height: 100%;
  }
`;
