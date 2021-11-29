import React, { ChangeEvent } from 'react';
import theme from 'styles/theme';
import { Button, InputField, Tags } from '.';

interface TagFormProps {
  id: string;
  label: string;
  name: string;
  value: string;
  placeholder: string;
  errorMsg?: string;
  localTags: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClicks: {
    addTagBtn: () => void;
    removeTagBtn: (e, key) => void;
  };
  className?: string;
}

const TagForm = ({
  id,
  label = '태그',
  name,
  value,
  placeholder,
  errorMsg,
  localTags,
  className,
  onChange,
  onClicks,
}: TagFormProps) => {
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
      <Button
        id={`${id}Btn`}
        title="태그 등록하기"
        shape="plus"
        fontSize="1.2em"
        color={theme.colors.secondary.base}
        onClick={onClicks.addTagBtn}
      />
      <Tags tags={localTags} isWrite onClickRemoveBtn={onClicks.removeTagBtn} />
    </div>
  );
};

export default TagForm;
