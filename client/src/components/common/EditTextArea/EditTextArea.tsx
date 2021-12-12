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
  placeholder?: string;
  readOnly?: boolean;
  completed?: boolean;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: () => void;
  onKeyPress?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  className?: string;
  errorClassName?: string;
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
      placeholder,
      readOnly = false,
      completed = false,
      onChange,
      onClick,
      onKeyPress,
      onFocus,
      className,
      errorClassName,
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
          placeholder={placeholder}
          readOnly={readOnly}
          completed={completed}
          ref={ref}
          onChange={onChange}
          onClick={onClick}
          onKeyPress={handleKeyPress}
          onFocus={onFocus}
          className={`${className ? className : ''} ${
            errorMsg ? 'errorInput' : ''
          }`.trim()}
        />
        {errorMsg && (
          <ErrorMsg children={errorMsg} className={errorClassName} />
        )}
      </div>
    );
  }
);

export default EditTextArea;
