import { EditTextArea, InputField } from 'components/common';
import styled from 'styled-components';
import theme from 'styles/theme';

export const StyledAddTodoForm = styled.form`
  /* TODO fontSize 더 상위로 옮기기 */
  font-size: ${theme.fonts.size.sm};
  width: 100%;

  .editTextAreaWrapper {
    width: 100%;
  }

  .todoAddBtn {
    svg {
      color: ${theme.colors.secondary.base}90;
    }
    &:hover svg {
      color: ${theme.colors.secondary.base};
    }
  }

  ${theme.flexes.row('start')}
`;
