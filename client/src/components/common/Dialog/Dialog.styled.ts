import styled from 'styled-components';
import theme from 'styles/theme';

/* ---------------------------------- modal --------------------------------- */
export const StyledDialog = styled.div`
  position: fixed;
  z-index: 10000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 90vw;
  min-height: 40vh;
  background-color: ${theme.colors.white}90;
  border-radius: ${theme.borders.radius.square};
  box-shadow: ${theme.boxShadow.wide};

  ${({ theme }) => theme.media.desktop`
    min-width: 480px;
    min-height: 300px;    
  `}
  ${({ theme }) => theme.media.tablet`
    max-width: 480px;
    max-height: 300px;    
  `}
  ${({ theme }) => theme.media.mobile`
    min-width: 90vw;
    min-height: 40vh;
  `}
`;

/* ----------------------------------- dim ---------------------------------- */
export const StyledDim = styled.div`
  position: fixed;
  z-index: 1000;
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
  width: 100%;
  max-height: 100%;
  overflow: auto;
  padding: 3em;
`;

export const StyledForm = styled.div`
  ${theme.flexes.mixin('column', 'start', 'start')}
`;

/* --------------------------- dialog close button -------------------------- */
export const StyledDialogCloseButton = styled.div`
  position: absolute;
  top: calc(3em - 1em);
  right: calc(3em - 1em);
  z-index: 10;
`;
