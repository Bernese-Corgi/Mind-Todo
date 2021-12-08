import styled from 'styled-components';
import theme from 'styles/theme';

export const EditDeleteButtonUnitWrapper = styled.div`
  width: 100%;
  ${theme.transition()}

  &:hover {
    .iconBtnWrapper {
      opacity: 100;
    }
  }

  .editTextAreaWrapper {
    width: 100%;
  }

  .iconBtnWrapper {
    opacity: 0;
    width: fit-content;

    /* TODO 옮기기 */
    button {
      font-size: 90%;
      padding: 0.5em;
    }

    .confirmUpdateBtn {
      &:hover svg {
        color: ${theme.colors.blue};
      }
    }

    .setUpdateBtn {
      &:hover svg {
        color: ${theme.colors.green};
      }
    }

    .removeBtn {
      &:hover svg {
        color: ${theme.colors.red};
      }
    }

    ${theme.transition()}
    ${theme.flexes.row('start')}
  }

  .stringBtnWrapper {
    button {
      margin-top: 0;
      width: max-content;
      font-size: 100%;
      padding: 0.5em;
      margin-left: 1em;

      a {
        font-size: 100%;
        padding: 0;
      }
    }

    ${theme.flexes.row('start')}
  }

  ${theme.flexes.row('space-between')}
`;
