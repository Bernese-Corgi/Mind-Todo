import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { handleSvgHoverColor } from 'utils/style';
import { EditDeleteIconButtonsUnitProps } from './EditDeleteButtonUnit';

export const EditDeleteButtonUnitWrapper = styled.div<EditDeleteIconButtonsUnitProps>`
  width: 100%;
  position: relative;

  &:hover {
    .iconBtnWrapper,
    .dateWrapper {
      opacity: 100;
    }
  }

  .editTextAreaWrapper {
    width: 100%;

    .editTextArea {
      ${theme.transition('0ms')}
    }
  }

  .dateWrapper {
    opacity: ${({ hoverEffect }) => (hoverEffect ? 0 : 100)};
    width: 100%;

    time {
      display: block;
      font-size: 0.8em;
      text-align: right;
      color: ${theme.colors.gray.base};
    }

    ${theme.positions.mixin('absolute', {
      top: '-50%',
      right: '0',
    })}
  }

  .iconBtnWrapper {
    opacity: ${({ hoverEffect }) => (hoverEffect ? 0 : 100)};
    width: fit-content;

    /* TODO 옮기기 */
    button {
      font-size: 90%;
      padding: 0.5em;
    }

    .confirmUpdateBtn {
      ${handleSvgHoverColor(theme.colors.blue)}
    }

    .setEditBtn {
      ${handleSvgHoverColor(theme.colors.green)}
    }

    .removeBtn {
      ${handleSvgHoverColor(theme.colors.red)}
    }

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
