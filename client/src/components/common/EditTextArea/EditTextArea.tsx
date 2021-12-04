import React, { ChangeEvent, forwardRef, KeyboardEvent } from 'react';
import { preventEnterKeyEvent } from 'utils/keyEvent';
import { ErrorMsg } from '..';
import { StyledEditTextArea } from './EditTextArea.styled';

export type EditTextAreaProps = {
  type?: string;
  id: string;
  name: string;
  value: string;
  errorMsg?: string;
  readOnly?: boolean;
  done?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e) => void;
  className?: string;
  preventEnter?: 'hard' | 'soft' | 'both';
  resizeHeight?: boolean;
};

const EditTextArea = forwardRef<HTMLTextAreaElement, EditTextAreaProps>(
  (
    {
      type = 'text',
      id,
      name,
      value,
      errorMsg,
      readOnly = false,
      done = false,
      onChange,
      onKeyPress,
      className,
      preventEnter,
      resizeHeight = true,
    }: EditTextAreaProps,
    ref
  ) => {
    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      preventEnter && preventEnterKeyEvent(e, preventEnter);
      onKeyPress && onKeyPress(e);

      if (resizeHeight) {
        const { scrollHeight } = e.target as HTMLTextAreaElement;
        (e.target as HTMLTextAreaElement).style.height = scrollHeight + 'px';
      }
    };

    return (
      <div className="editTextAreaWrapper">
        <StyledEditTextArea
          type={type}
          id={id}
          name={name}
          value={value}
          readOnly={readOnly}
          done={done}
          ref={ref}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          className={`${className} ${errorMsg && 'errorInput'}`}
        />
        {errorMsg && <ErrorMsg children={errorMsg} />}
      </div>
    );
  }
);

export default EditTextArea;
