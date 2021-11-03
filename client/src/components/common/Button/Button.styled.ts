import { Link, LinkProps } from 'react-router-dom';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { Icon } from '..';
import { IconProps } from '../Icon/Icon';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  value?: string;
  children: React.ReactNode;
  round?: 'round' | 'square';
  fullWidth?: boolean;
  textOnly?: boolean;
  primary?: boolean;
  onClick?: () => void;
}

type IconButtonProps = IconProps & {
  onClick?: () => void;
};

const defButtonStyle = css`
  margin: ${theme.margins.base};
  font-weight: ${theme.fonts.weight.bold};
  padding: ${theme.paddings.sm} ${theme.paddings.lg};
`;

const handleDefButtonStyle = ({ round, primary, textOnly, fullWidth }) => css`
  border-radius: ${theme.borders.radius[round || 'square']};
  width: ${fullWidth ? '100%' : 'fit-content'};
  margin-left: 0;
  margin-right: 0;
  background-color: ${primary
    ? theme.colors.primary.base
    : theme.colors.secondary.base};
  background-color: ${textOnly && 'transparent'};
  color: ${textOnly ? theme.colors.gray.dark : theme.colors.white};
  ${theme.transition('200ms', 'ease-in-out')}

  &:hover {
    box-shadow: ${theme.boxShadow.default};
  }

  &:disabled {
    background-color: ${theme.colors.gray.light};
    color: ${theme.colors.gray.base};
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const StyledButton = styled.button<ButtonProps>`
  ${defButtonStyle}

  ${({ round, primary, textOnly, fullWidth }) =>
    handleDefButtonStyle({ round, primary, textOnly, fullWidth })}
`;

export const StyledLink = styled(Link)<LinkProps & ButtonProps>`
  display: inline-block;
  ${defButtonStyle}

  ${({ round, primary, textOnly, fullWidth }) =>
    handleDefButtonStyle({ round, primary, textOnly, fullWidth })}
`;

export const StyledIconButton = styled(Icon)<IconButtonProps>``;
