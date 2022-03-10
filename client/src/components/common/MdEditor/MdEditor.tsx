import React, { ChangeEvent, KeyboardEvent, RefObject } from 'react';
import { insertBlankTab, keyPressUtils } from 'utils/events/keyEvent';
import { ErrorMsg, MdToolbar } from '..';
import { toggleMarkWhenClickEnter } from 'utils/editor/enterKey';

export type MdEditorTextAreaProps = {
  editorRef?: RefObject<HTMLTextAreaElement>;
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
  editorRef,
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
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) =>
    editorRef && insertBlankTab(editorRef, e);

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    keyPressUtils(e, 'Enter', () =>
      toggleMarkWhenClickEnter(e, editorRef!.current, '- ')
    );
    keyPressUtils(e, 'Enter', () =>
      toggleMarkWhenClickEnter(e, editorRef!.current, '1. ')
    );
  };

  return (
    <div className="mdEditorWrapper">
      <label className={hideLabel ? 'a11yHidden' : ''} htmlFor={id}>
        {label && label}
      </label>
      {editorRef && <MdToolbar editorRef={editorRef} />}
      <textarea
        ref={editorRef}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        readOnly={readOnly}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onKeyDown={handleKeyDown}
        className={`${errorMsg && 'errorInput'}`}
      />
      <ErrorMsg children={errorMsg} />
    </div>
  );
};

export default MdEditor;
