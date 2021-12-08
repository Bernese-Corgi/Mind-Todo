import React, { ChangeEvent } from 'react';
import { Icon } from '..';
import {
  CheckBoxWrapper,
  StyledCheckBoxInput,
  StyledCheckBoxLabel,
} from './CheckBox.styled';

export type CheckBoxProps = CheckBoxWrapperProps &
  CheckBoxLabelProps &
  CheckBoxInputProps & {
    color?: string;
    children?: React.ReactNode;
  };

export type CheckBoxWrapperProps = {
  shape: string;
};

export type CheckBoxLabelProps = {
  onKeyPress?: (e: React.KeyboardEvent<HTMLLabelElement>) => void;
};

export type CheckBoxInputProps = {
  id?: string;
  name: string;
  value?: string;
  title: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox = ({
  id,
  name,
  value,
  title,
  checked,
  children,
  onChange,
  onKeyPress,
  shape,
  color,
}: CheckBoxProps) => {
  return (
    <CheckBoxWrapper shape={shape}>
      <StyledCheckBoxLabel>
        {checked ? (
          <Icon id={id} shape={`checked-${shape}`} color={color} />
        ) : (
          <Icon id={id} shape={shape} color={color} />
        )}
      </StyledCheckBoxLabel>
      <StyledCheckBoxInput
        type="checkbox"
        name={name}
        value={value}
        title={title}
        aria-label={title}
        checked={checked}
        onChange={onChange}
        tabIndex={-1}
        children={children}
      />
    </CheckBoxWrapper>
  );
};

export default CheckBox;
