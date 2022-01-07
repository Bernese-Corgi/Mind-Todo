import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { handleHoverColorType, handleSvgHoverColor } from 'utils/style';
import { CheckBoxWrapperProps } from './CheckBox';

export const CheckBoxWrapper = styled.div<CheckBoxWrapperProps>`
  position: relative;
  width: 1em;
  height: 1em;
  margin: 0.5em;
  cursor: pointer;

  &:active svg {
    width: 0.94em;
    height: 0.94em;
    margin: 0.06em;

    ${theme.transition('50ms')}
  }

  ${({ shape }) => css`
    ${handleSvgHoverColor(handleHoverColorType(shape))}
  `}
`;

export const StyledCheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: pointer;
`;

export const StyledCheckBoxInput = styled.input`
  ${theme.positions.absolute.center}
  cursor: pointer;
  z-index: 100;
  opacity: 0;
`;
