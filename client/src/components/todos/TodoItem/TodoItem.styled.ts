import styled from 'styled-components';
import theme from 'styles/theme';

export const removeDialogStyle = `
background: ${theme.colors.white};
border-radius: ${theme.borders.radius.square};
width: 30vw;
min-height: 150px;
font-size: ${theme.fonts.size.sm};

.dialogBody {
  padding: 1.7em;
  top: 2em;
  
  p {
    margin-top: 2em;
  }

  ${theme.flexes.mixin('column', 'center', 'center')}
}

.dialogBtnWrapper {
  font-size: 80%;
  width: 100%;
  margin-top: 1em;

  button {
    margin-left: 0.5em;
  }
  ${theme.flexes.row('flex-end')}

}
`;

export const TodoItemWrapper = styled.div`
  /* TODO fontSize 더 상위로 옮기기 */
  font-size: ${theme.fonts.size.sm};
  width: 100%;
  height: auto;
  border-radius: ${theme.borders.radius.square};
  ${theme.transition()}

  &:hover {
    background-color: ${theme.colors.gray.light}40;

    .todoItemBtnWrapper {
      opacity: 100;
    }
  }

  .editTextAreaWrapper {
    width: 100%;
  }

  .todoItemBtnWrapper {
    opacity: 0;

    /* TODO 옮기기 */
    button {
      font-size: 90%;
      padding: 0.5em;
    }
    .confirmEditBtn {
      &:hover svg {
        color: ${theme.colors.blue};
      }
    }
    .editTodoBtn {
      &:hover svg {
        color: ${theme.colors.green};
      }
    }
    .deleteTodoBtn {
      &:hover svg {
        color: ${theme.colors.red};
      }
    }

    ${theme.transition()}
    ${theme.flexes.row('center')}
  }

  ${theme.flexes.row('space-between')}
`;
