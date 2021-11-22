import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledWriteActionBtnSect = styled.section`
  width: 100%;
  height: 100%;

  ${theme.flexes.column('center')};

  .text {
    font-size: 1.2em;
    margin-top: 5em;
  }

  .noDataImg {
    width: 15%;
    height: 15%;
    min-width: 10em;
  }

  #goToWritePostPage {
    font-size: 1.3em;
    margin-top: 3em;

    &:hover {
      color: ${theme.colors.red};
    }
  }
`;
