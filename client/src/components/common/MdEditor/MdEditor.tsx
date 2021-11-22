import React, { ChangeEvent, KeyboardEvent } from 'react';
import { StyledMdEditorTextArea } from './MdEditor.styled';

export type MdEditorTextAreaProps = {
  id: string;
  name: string;
  value: string;
  errorMsg?: string;
  placeholder?: string;
  autoComplete?: string;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

type MdEditorProps = MdEditorTextAreaProps & {
  label?: string;
  hideLabel?: boolean;
};

const MdEditor = ({
  id = 'mdEditor',
  label = 'Markdown Editor',
  name = 'mdEditor',
  value,
  errorMsg,
  placeholder,
  autoComplete = 'off',
  readOnly,
  onChange,
  hideLabel = false,
}: MdEditorProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    //
    if (e.key === 'Tab') {
      console.log(e);
      // e.preventDefault();
      return '\t';
    }
  };

  return (
    <div>
      <label className={hideLabel ? 'a11yHidden' : ''} htmlFor={id}>
        {label && label}
      </label>
      <StyledMdEditorTextArea
        id={id}
        name={name}
        value={value}
        errorMsg={errorMsg}
        placeholder={placeholder}
        autoComplete={autoComplete}
        readOnly={readOnly}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default MdEditor;
