import React from 'react';

import { Icon } from '..';
import {
  StyledButton,
  StyledIconButton,
  StyledLinkButton,
} from './Button.styled';
import { Link } from 'react-router-dom';

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  form?: string;
  value?: string;
  children?: React.ReactNode;
  round?: 'round' | 'square';
  fullWidth?: boolean;
  textOnly?: boolean;
  primary?: boolean;
  onClick?: () => void;
};

export type IconButtonProps = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  shape?: string;
  fontSize?: string;
  onClick?: () => void;
};

export type LinkButtonProps = {
  linkTo?: string | object;
};

const Button = ({
  type = 'button',
  form,
  value = '',
  children,
  round = 'square',
  fullWidth = false,
  textOnly = false,
  primary,
  onClick,
  shape,
  fontSize = '1.4rem',
  linkTo,
  ...restProps
}: ButtonProps & IconButtonProps & LinkButtonProps) => {
  /* ------------------------------- Link Button ------------------------------ */
  if (linkTo)
    return (
      <StyledLinkButton
        type={type}
        value={value}
        round={round}
        fullWidth={fullWidth}
        textOnly={textOnly}
        primary={primary}
        {...restProps}>
        <Link to={linkTo}>{children}</Link>
      </StyledLinkButton>
    );

  /* ------------------------------- Icon Button ------------------------------ */
  if (shape)
    return (
      <StyledIconButton
        type={type}
        shape={shape}
        fontSize={fontSize}
        onClick={onClick}
        {...restProps}>
        <Icon shape={shape} />
      </StyledIconButton>
    );

  /* ----------------------------- Default Button ----------------------------- */
  return (
    <StyledButton
      type={type}
      form={form}
      value={value}
      round={round}
      fullWidth={fullWidth}
      textOnly={textOnly}
      primary={primary}
      onClick={onClick}
      {...restProps}>
      {children}
    </StyledButton>
  );
};

export default Button;
