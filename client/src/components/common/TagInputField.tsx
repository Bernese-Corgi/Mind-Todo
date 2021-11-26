import React, { ChangeEvent } from 'react';
import { InputField } from '.';

interface TagInputProps {
  id: string;
  label: string;
  name: string;
  value: string;
  placeholder: string;
  errorMsg?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const TagInputField = ({
  id,
  label = '태그',
  name,
  value,
  placeholder,
  errorMsg,
  className,
  onChange,
}: TagInputProps) => {
  return (
    <div className="tagInputWrapper">
      <InputField
        id={id}
        label={label}
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        errorMsg={errorMsg}
        onChange={onChange}
        className={`${className} ${errorMsg && 'errorInput'}`}
      />
    </div>
  );
};

export default TagInputField;
