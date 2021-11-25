import React, { ChangeEvent } from 'react';
import { ErrorMsg } from '..';

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
}: MdEditorProps) => (
  <div className="mdEditorWrapper">
    <label className={hideLabel ? 'a11yHidden' : ''} htmlFor={id}>
      {label && label}
    </label>
    <textarea
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      readOnly={readOnly}
      onChange={onChange}
      className={`${errorMsg && 'errorInput'}`}
    />
    <ErrorMsg children={errorMsg} />
  </div>
);

export default MdEditor;
