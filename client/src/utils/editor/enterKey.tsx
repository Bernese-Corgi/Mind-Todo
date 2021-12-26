import { KeyboardEvent } from 'react';
import { getTextareaState } from './selection';

const findMarkWhenClickEnter = (
  textarea: HTMLTextAreaElement,
  mark: string
) => {
  const markLen = mark.length;

  const { value, valueLen, beforeVal, prevLine, nextLine } = getTextareaState(
    textarea,
    'current'
  );

  const isFirstLine = prevLine === -1;
  const isLastLine = nextLine === -1;

  const findMarkAtLastLine = beforeVal
    .substring(beforeVal.length - markLen, beforeVal.length)
    .includes(mark);

  const findMarkAtMiddleLine = value
    .substring(prevLine, prevLine + markLen + 1)
    .includes('\n' + mark);

  const findMarkWithTextAtLastLine = value
    .substring(valueLen - markLen, valueLen)
    .includes('\n' + mark);

  const isOnlyFirstMark = beforeVal.indexOf(mark) === 0 && beforeVal === mark;
  const isFirstMark = beforeVal.indexOf(mark) === 0;

  const isOnlyMarkLen = nextLine - prevLine === markLen + 1;

  return {
    onlyMark:
      (isOnlyFirstMark && isFirstLine) || // first line
      (findMarkAtMiddleLine && isOnlyMarkLen) || // middle line
      (findMarkAtLastLine && isLastLine), // last line
    markWithText:
      (isFirstMark && isFirstLine) || // first line
      findMarkAtMiddleLine || // middle line
      findMarkWithTextAtLastLine, // last line
  };
};

export const toggleMarkWhenClickEnter = (
  e: KeyboardEvent<HTMLTextAreaElement>,
  textarea: HTMLTextAreaElement | null,
  mark: string
) => {
  if (!textarea) return;

  const markLen = mark.length;

  const { beforeVal, afterVal, selection } = getTextareaState(
    textarea,
    'current'
  );

  const { onlyMark, markWithText } = findMarkWhenClickEnter(textarea, mark);

  if (onlyMark) {
    e.preventDefault();

    const beforeValLen = beforeVal.length;

    textarea.value = beforeVal.substring(0, beforeValLen - markLen) + afterVal;

    textarea.setSelectionRange(beforeValLen - markLen, beforeValLen - markLen);
  } else if (markWithText) {
    e.preventDefault();

    textarea.value = beforeVal + '\n' + mark + afterVal;

    textarea.setSelectionRange(
      selection.start + markLen + 1,
      selection.start + markLen + 1
    );
  }
};
