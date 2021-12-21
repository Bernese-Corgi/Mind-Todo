import { KeyboardEvent, RefObject } from 'react';

export const keyPressUtils = (
  e: KeyboardEvent<HTMLElement>,
  key: string,
  callback: () => void
) => {
  if (e.key === key) callback();
};

export const preventEnterKeyEvent = (
  e: KeyboardEvent<HTMLElement>,
  mode: 'hard' | 'soft' | 'both'
) => {
  switch (mode) {
    case 'hard':
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
      }
      break;
    case 'soft':
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
      }
      break;
    case 'both':
      if (e.key === 'Enter') {
        e.preventDefault();
      }
      break;

    default:
      break;
  }
};

export const insertBlankTab = (
  inputRef: RefObject<HTMLTextAreaElement>,
  e: KeyboardEvent<HTMLElement>
) => {
  if (!inputRef.current) return;

  const blank = '  ';
  const blankLen = blank.length;

  const { selectionStart } = inputRef.current;

  const textVal = inputRef.current.value;

  const beforeText = textVal.substring(0, selectionStart);
  const afterText = textVal.substring(selectionStart, textVal.length);

  if (e.key === 'Tab') {
    e.preventDefault();
    inputRef.current.value = beforeText + blank + afterText;

    inputRef.current.setSelectionRange(
      selectionStart + blankLen,
      selectionStart + blankLen
    );
  }
};
