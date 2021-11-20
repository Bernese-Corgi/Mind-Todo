import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { handleHoverColorType } from 'utils/style';
import { ButtonProps, IconButtonProps, LinkButtonProps } from './Button';

const { fonts, colors, borders, margins, paddings, transition, flexes } = theme;

const defButtonStyle = css`
  margin: ${margins.base};
  font-weight: ${fonts.weight.bold};
  padding: ${paddings.sm} ${paddings.lg};
`;

const handleDefButtonStyle = (props: ButtonProps) => {
  const { round, primary, textOnly, fullWidth } = props;

  return css`
    border-radius: ${borders.radius[round || 'square']};
    width: ${fullWidth ? '100%' : 'fit-content'};
    margin-left: 0;
    margin-right: 0;
    background-color: ${textOnly
      ? 'transparent'
      : primary
      ? colors.primary.base
      : colors.gray.light};
    color: ${textOnly
      ? colors.gray.dark
      : primary
      ? colors.white
      : colors.gray.base};

    ${transition('200ms', 'ease-in-out')}

    &:hover {
      background-color: ${textOnly
        ? 'transparent'
        : primary
        ? colors.primary.highSat
        : colors.primary.light};
      color: ${!primary && colors.gray.dark};
      text-decoration: ${textOnly && 'underline'};
    }

    &:disabled {
      background-color: ${colors.gray.light};
      color: ${colors.gray.base};
      cursor: not-allowed;
      box-shadow: none;
    }
  `;
};

export const StyledButton = styled.button<ButtonProps>`
  ${defButtonStyle}
  ${({ id, title, round, primary, textOnly, fullWidth }) =>
    handleDefButtonStyle({ id, title, round, primary, textOnly, fullWidth })}
`;

export const StyledLinkButton = styled.button<LinkButtonProps & ButtonProps>`
  display: inline-block;
  ${defButtonStyle}
  ${({ id, title, round, primary, textOnly, fullWidth }) =>
    handleDefButtonStyle({ id, title, round, primary, textOnly, fullWidth })}
`;

export const StyledIconButton = styled.button<IconButtonProps>`
  ${flexes.center}
  padding: 1em;

  ${({ shape, fontSize }) => {
    return css`
      font-size: ${fontSize || '1em'};

      &:hover Svg {
        color: ${handleHoverColorType(shape)};
      }
    `;
  }}
`;

StyledButton.displayName = 'StyledButton';
StyledLinkButton.displayName = 'StyledLinkButton';
StyledIconButton.displayName = 'StyledIconButton';
