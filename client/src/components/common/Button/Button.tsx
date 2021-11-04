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
  value?: string;
  children?: React.ReactNode;
  round?: 'round' | 'square';
  fullWidth?: boolean;
  textOnly?: boolean;
  primary?: boolean;
  onClick?: () => void;
};

export type IconButtonProps = {
  shape?: string;
  fontSize?: string;
  onClick?: () => void;
};

export type LinkButtonProps = {
  linkTo?: string | object;
};

const Button = (props: ButtonProps & IconButtonProps & LinkButtonProps) => {
  /* ------------------------------- Link Button ------------------------------ */
  if (props.linkTo)
    return (
      <StyledLinkButton
        type={props.type}
        value={props.value}
        round={props.round}
        fullWidth={props.fullWidth}
        textOnly={props.textOnly}
        primary={props.primary}>
        <Link to={props.linkTo}>{props.children}</Link>
      </StyledLinkButton>
    );

  /* ------------------------------- Icon Button ------------------------------ */
  if (props.shape)
    return (
      <StyledIconButton
        shape={props.shape}
        fontSize={props.fontSize}
        onClick={props.onClick}>
        <Icon shape={props.shape} />
      </StyledIconButton>
    );

  /* ----------------------------- Default Button ----------------------------- */
  return (
    <StyledButton
      type={props.type}
      value={props.value}
      round={props.round}
      fullWidth={props.fullWidth}
      textOnly={props.textOnly}
      primary={props.primary}
      onClick={props.onClick}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
