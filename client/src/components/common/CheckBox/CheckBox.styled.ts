import styled from 'styled-components';
import theme from 'styles/theme';
import { handleHoverColorType } from 'utils/style';
import { CheckBoxWrapperProps } from './CheckBox';

export const CheckBoxWrapper = styled.div<CheckBoxWrapperProps>`
  position: relative;
  width: 1em;
  height: 1em;
  margin: 0.5em;
  cursor: pointer;

  &:hover svg {
    color: ${({ shape }) => handleHoverColorType(shape)};
  }
`;

export const StyledCheckBoxLabel = styled.label`
  ${theme.positions.absolute.center}
  cursor: pointer;
`;

export const StyledCheckBoxInput = styled.input`
  ${theme.positions.absolute.center}
  cursor: pointer;
  z-index: 100;
  opacity: 0;
`;
