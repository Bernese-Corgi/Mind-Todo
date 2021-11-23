import React, { ChangeEvent, forwardRef } from 'react';

export type InputProps = {
  id: string;
  label?: string;
  type?: 'email' | 'password' | 'text';
  name?: string;
  value?: string;
  errorMsg?: string | boolean;
  placeholder?: string;
  autoComplete?: string;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  hideLabel?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type = 'text',
      name,
      value,
      errorMsg = '',
      placeholder,
      autoComplete,
      readOnly = false,
      onChange,
      hideLabel = false,
    },
    ref = null
  ) => {
    return (
      <div className="inputLabelWrapper">
        <label htmlFor={id} className={`${hideLabel && 'a11yHidden'}`}>
          {label && label}
        </label>
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
          className={`${errorMsg && 'errorInput'}`}
        />
      </div>
    );
  }
);

export default Input;
