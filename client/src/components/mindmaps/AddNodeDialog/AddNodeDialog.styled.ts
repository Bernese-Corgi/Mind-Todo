import styled from 'styled-components';
import theme from 'styles/theme';
import { handleSvgHoverColor } from 'utils/style';

export const addNodeDialogStyle = `
  background: ${theme.colors.white};
  border-radius: ${theme.borders.radius.square};
  width: 30vw;
  min-width: 300px;
  min-height: 140px;
  padding: 0;
  font-size: ${theme.fonts.size.sm};
`;

export const AddNodeDialogWrapper = styled.div`
  ${theme.flexes.mixin('column', 'start', 'start')}
  width: 100%;
  height: 100%;
  padding: 1.8em;
  color: ${theme.colors.gray.dark};

  h3 {
    font-size: 0.85em;
    margin-left: 0.5em;
    margin-bottom: 0.5em;
  }
`;

export const StyledAddNodeForm = styled.form`
  ${theme.flexes.row('start')}
  font-size: ${theme.fonts.size.sm};
  width: 100%;

  textarea {
    ${theme.defElem.input()}
    margin-bottom: 0.5em;
  }

  ${handleSvgHoverColor(theme.colors.secondary.base)}
`;
