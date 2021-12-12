import theme from 'styles/theme';
import { handleSvgHoverColor } from 'utils/style';

export const deleteDialogStyle = `
  background: ${theme.colors.white};
  border-radius: ${theme.borders.radius.square};
  width: 300px;
  min-height: 150px;
  font-size: ${theme.fonts.size.sm};

  .delDialogBody {
    padding: 1.5em;
    top: 0;

    pre {
      margin-top: 2em;
      margin-left: 3em;
    }

    ${theme.flexes.mixin('column', 'start', 'space-between')}
  }

  .delDialogBtns {
    font-size: 80%;
    width: 100%;
    position: absolute;
    bottom: 1em;
    right: 1em;

    button {
      margin-right: 1em;
    ${handleSvgHoverColor()}
    }

    ${theme.flexes.row('flex-end')}
  }
`;
