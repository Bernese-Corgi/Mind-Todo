import styled from 'styled-components';
import theme from 'styles/theme';
import { AddMindmapDialogProps } from './AddMindmapDialog';

export const addMindmapDialogStyle = `
  background: ${theme.colors.white};
  border-radius: ${theme.borders.radius.square};
  width: 50vw;
  min-height: 180px;
  font-size: ${theme.fonts.size.sm};
`;
export const AddMindmapDialogWrapper = styled.div`
  ${theme.flexes.mixin('column', 'start', 'start')}
  width: 100%;
  height: 100%;
  padding: 1.8em;

  h2 {
    font-size: 0.85em;
    margin-left: 0.5em;
    margin-bottom: 1em;
  }
`;

export const StyledMindmapForm = styled.form<AddMindmapDialogProps>`
  width: 95%;
  margin: 0 auto 0 auto;

  .inputLabelWrapper {
    width: 100%;
  }

  input {
    ${theme.defElem.input()}
    margin-bottom: 0.2em;
  }

  .addMindmapDialogBtnWrapper {
    margin-top: 0.8em;
    ${theme.flexes.row('flex-end')}

    button {
      font-size: 80%;
      margin-right: 0.8em;
    }
  }
`;

AddMindmapDialogWrapper.displayName = 'AddMindmapDialogWrapper';
StyledMindmapForm.displayName = 'StyledMindmapForm';
