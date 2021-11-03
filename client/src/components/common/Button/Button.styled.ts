import { Link, LinkProps } from 'react-router-dom';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { Icon } from '..';
import { IconProps } from '../Icon/Icon';

const { fonts, colors, borders, margins, paddings, boxShadow, transition } =
  theme;

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  value?: string;
  children: React.ReactNode;
  round?: 'round' | 'square';
  fullWidth?: boolean;
  textOnly?: boolean;
  secondary?: boolean;
  onClick?: () => void;
}

type IconButtonProps = IconProps & {
  onClick?: () => void;
};

const defButtonStyle = css`
  margin: ${margins.base};
  font-weight: ${fonts.weight.bold};
  padding: ${paddings.sm} ${paddings.lg};
`;

const handleDefButtonStyle = ({ round, secondary, textOnly, fullWidth }) => css`
  border-radius: ${borders.radius[round || 'square']};
  width: ${fullWidth ? '100%' : 'fit-content'};
  margin-left: 0;
  margin-right: 0;
  background-color: ${textOnly
    ? 'transparent'
    : secondary
    ? colors.secondary.base
    : colors.primary.base};
  color: ${textOnly ? colors.gray.dark : colors.white};
  ${transition('200ms', 'ease-in-out')}

  &:hover {
    box-shadow: ${boxShadow.default};
  }

  &:disabled {
    background-color: ${colors.gray.light};
    color: ${colors.gray.base};
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const StyledButton = styled.button<ButtonProps>`
  ${defButtonStyle}
  ${({ round, secondary, textOnly, fullWidth }) =>
    handleDefButtonStyle({ round, secondary, textOnly, fullWidth })}
`;

export const StyledLink = styled(Link)<LinkProps & ButtonProps>`
  display: inline-block;
  ${defButtonStyle}
  ${({ round, secondary, textOnly, fullWidth }) =>
    handleDefButtonStyle({ round, secondary, textOnly, fullWidth })}
`;

export const StyledIconButton = styled(Icon)<IconButtonProps>``;
