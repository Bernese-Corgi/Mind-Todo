import React, { ChangeEvent, forwardRef } from 'react';

export type InputProps = {
  id: string;
  label?: string;
  type?: 'email' | 'password' | 'text';
  name?: string;
  value?: string;
  placeholder?: string;
  autoComplete?: string;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type = 'text',
      name,
      value,
      placeholder,
      autoComplete,
      readOnly = false,
      onChange,
    },
    ref = null
  ) => {
    return (
      <div className="inputLabelWrapper">
        <label htmlFor={id}>{label && label}</label>
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          ref={ref}
          readOnly={readOnly}
          onChange={onChange}
        />
      </div>
    );
  }
);

export default Input;