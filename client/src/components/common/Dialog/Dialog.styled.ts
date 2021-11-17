import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { DialogWrapperProps } from './Dialog';

/* ---------------------------------- modal --------------------------------- */
const defaultDialogStyle = `
position: fixed;
z-index: 1000;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

export const StyledDialog = styled.div<DialogWrapperProps>`
  ${({ wrapperStyle }) =>
    wrapperStyle
      ? css`
          ${defaultDialogStyle}
          ${wrapperStyle}
        `
      : css`
          ${defaultDialogStyle}
          width: 80vw;
          max-width: 500px;
          min-height: 50vh;
          min-width: 320px;

          background-color: ${theme.colors.white};
          border-radius: ${theme.borders.radius.square};
          box-shadow: ${theme.boxShadow.wide};

          ${({ theme }) => theme.media.mobile`
            min-height: 45vh;
           `}
        `}
`;

/* ----------------------------------- dim ---------------------------------- */
export const StyledDim = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${theme.colors.gray.dark}40;
`;

/* -------------------------- dialog body container ------------------------- */
export const StyledDialogBody = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

/* --------------------------- dialog close button -------------------------- */
export const StyledDialogCloseButton = styled.div`
  position: absolute;
  top: 1.5em;
  right: 1.5em;
  z-index: 10;
`;

StyledDialog.displayName = 'StyledDialog';
StyledDim.displayName = 'StyledDim';
StyledDialogBody.displayName = 'StyledDialogBody';
StyledDialogCloseButton.displayName = 'StyledDialogCloseButton';
