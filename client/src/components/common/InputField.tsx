import React, { ChangeEvent, forwardRef } from 'react';
import { ErrorMsg } from '.';

export type InputProps = {
  id: string;
  label?: string;
  type?: 'email' | 'password' | 'text';
  name?: string;
  value?: string;
  errorMsg?: string;
  errorClassName?: string;
  placeholder?: string;
  autoComplete?: string;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  hideLabel?: boolean;
  className?: string;
};

const InputField = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type = 'text',
      name,
      value,
      errorMsg = '',
      errorClassName,
      placeholder,
      autoComplete,
      readOnly = false,
      onChange,
      hideLabel = false,
      className,
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
          className={`${className} ${errorMsg && 'errorInput'}`}
        />
        <ErrorMsg className={errorClassName} children={errorMsg} />
      </div>
    );
  }
);

export default InputField;
