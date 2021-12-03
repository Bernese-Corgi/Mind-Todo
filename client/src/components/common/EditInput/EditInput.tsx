import React, { ChangeEvent, forwardRef, KeyboardEvent } from 'react';
import { StyledEditInput } from './EditInput.styled';

export type EditInputProps = {
  type?: string;
  id: string;
  name: string;
  value: string;
  readOnly?: boolean;
  done?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

const EditInput = forwardRef<HTMLInputElement, EditInputProps>(
  (
    {
      type = 'text',
      id,
      name,
      value,
      readOnly = false,
      done = false,
      onChange,
      onKeyPress,
    }: EditInputProps,
    ref
  ) => {
    return (
      <div className="editInputWrapper">
        <StyledEditInput
          type={type}
          id={id}
          name={name}
          value={value}
          readOnly={readOnly}
          done={done}
          ref={ref}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  }
);

export default EditInput;
