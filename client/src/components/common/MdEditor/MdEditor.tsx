import React, { ChangeEvent, KeyboardEvent, RefObject } from 'react';
import { ErrorMsg, MdToolbar } from '..';

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

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!editorRef) return;
    const textVal = editorRef.current?.value;
    const textLen = textVal?.length;
    const selectStart = editorRef.current?.selectionStart;
    const selectEnd = editorRef.current?.selectionEnd;

    if (selectStart === undefined || selectEnd === undefined) return;
    if (!editorRef.current) return;

    const lastN = textVal?.lastIndexOf('\n', selectStart - 1);
    const nextN = textVal?.indexOf('\n', selectStart);

    if (lastN && nextN) {
      const beforeText = textVal?.substring(0, selectStart);
      const afterText = textVal?.substring(selectStart, textLen);

      const findList = textVal?.substring(lastN, lastN + 3).includes('\n- ');

      if (findList && nextN - lastN === 3 && e.key === 'Enter') {
        e.preventDefault();
        if (!beforeText) return;
        editorRef.current.value =
          beforeText.substring(0, beforeText.length - 2) + afterText;
        editorRef.current?.setSelectionRange(
          beforeText.length - 2,
          beforeText.length - 2
        );
        return;
      }
      if (!textLen) return;
      const lastList = textVal
        ?.substring(textLen - 3, textLen)
        .includes('\n- ');

      if (lastList && nextN === -1 && e.key === 'Enter') {
        e.preventDefault();
        if (!beforeText) return;
        editorRef.current.value =
          beforeText.substring(0, beforeText.length - 2) + afterText;
        editorRef.current?.setSelectionRange(
          beforeText.length - 2,
          beforeText.length - 2
        );
        return;
      }

      if (findList && e.key === 'Enter') {
        e.preventDefault();

        editorRef.current.value = beforeText + '\n- ' + afterText;
        if (beforeText) {
          editorRef.current?.setSelectionRange(
            selectStart + 3,
            selectStart + 3
          );
        }
      }
    }
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
        className={`${errorMsg && 'errorInput'}`}
      />
      <ErrorMsg children={errorMsg} />
    </div>
  );
};

export default MdEditor;
