import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledWriteActionBtnSect = styled.section`
  ${theme.flexes.column('center')};

  .descText {
    margin-top: 15%;
  }

  .noDataImg {
    width: 15%;
    height: 15%;
    padding-top: 5%;
    min-width: 3em;
  }

  #goToWritePostPage {
    font-size: 1.1em;
    margin-top: 5%;

    &:hover {
      color: ${theme.colors.red};
    }
  }
`;
