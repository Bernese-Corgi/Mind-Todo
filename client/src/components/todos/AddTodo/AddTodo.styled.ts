import styled from 'styled-components';
import theme from 'styles/theme';
import { handleSvgHoverColor } from 'utils/style';

export const StyledAddTodoForm = styled.form`
  /* TODO fontSize 더 상위로 옮기기 */
  font-size: ${theme.fonts.size.sm};
  width: 100%;

  .todoAddBtn {
    padding: 0.5em;

    ${handleSvgHoverColor(theme.colors.secondary.base)}
  }

  .openBtn {
    font-size: 0.8em;
    background-color: #fff;
    border: 0.18em solid ${theme.colors.primary.dark}70;
    color: ${theme.colors.primary.dark}99;

    &:hover {
      border: 0.18em solid transparent;
      background-color: ${theme.colors.primary.light}90;
      color: ${theme.colors.primary.dark};
    }
  }

  .closeBtn {
    padding: 0.5em;

    ${handleSvgHoverColor(theme.colors.primary.dark)}

    svg {
      margin-left: 0.3em;
    }

    ${theme.flexes.row('start')}
  }

  .editTextAreaWrapper {
    width: 100%;
    position: relative;
  }

  .errorTextArea {
    position: absolute;
    top: 2.1em;
    left: 0.5em;
    z-index: -1;
  }

  ${theme.flexes.row('start')}
`;
