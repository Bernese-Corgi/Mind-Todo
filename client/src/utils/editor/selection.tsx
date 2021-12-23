export const setSelection = (
  textarea: HTMLTextAreaElement,
  range: { start: number; end: number }
) => {
  textarea.focus();
  textarea.setSelectionRange(range.start, range.end);
};

export const getTextareaState = (
  textarea: HTMLTextAreaElement,
  location: 'start' | 'current'
) => {
  const { value, selectionStart, selectionEnd } = textarea;

  const inputLen = value.length;

  const prevLine = value.lastIndexOf('\n', selectionStart - 1);
  const nextLine = value.indexOf('\n', selectionStart);

  const commonState = {
    value,
    inputLen,
    prevLine,
    nextLine,
    selection: {
      start: selectionStart,
      end: selectionEnd,
    },
  };

  switch (location) {
    case 'start':
      return {
        ...commonState,
        beforeVal: value.substring(0, prevLine + 1),
        selectedVal: '',
        afterVal: value.substring(prevLine + 1, inputLen),
      };
    case 'current':
      return {
        ...commonState,
        beforeVal: value.substring(0, selectionStart),
        selectedVal: value.substring(selectionStart, selectionEnd),
        afterVal: value.substring(selectionEnd, inputLen),
      };
    default:
      return {
        ...commonState,
        beforeVal: value.substring(0, selectionStart),
        selectedVal: value.substring(selectionStart, selectionEnd),
        afterVal: value.substring(selectionEnd, inputLen),
      };
  }
};

export const textWithMarkExcDuplication = (
  textarea: HTMLTextAreaElement,
  mark: string,
  location: 'start' | 'current'
) => {
  const markLen = mark.length;

  if (location === 'start') {
    const { beforeVal, afterVal } = getTextareaState(textarea, 'start');

    const hasMark = afterVal.startsWith(mark);

    return hasMark
      ? beforeVal + afterVal.substring(markLen, afterVal.length)
      : beforeVal + mark + afterVal;
  } else {
    const { inputLen, beforeVal, afterVal, selectedVal } = getTextareaState(
      textarea,
      'current'
    );

    const hasMarkInside =
      selectedVal.startsWith(mark) && selectedVal.endsWith(mark);

    const hasMarkOutside =
      beforeVal.lastIndexOf(mark) !== -1 && afterVal.indexOf(mark) !== -1;

    const textWhenDupInside =
      beforeVal + selectedVal.substring(markLen, selectedVal.length - markLen);

    const textWhenDupOutside =
      beforeVal.substring(0, beforeVal.lastIndexOf(mark)) +
      selectedVal +
      afterVal.substring(markLen, inputLen);

    const textWhenNotDup = beforeVal + mark + selectedVal + mark + afterVal;

    return hasMarkInside
      ? textWhenDupInside
      : hasMarkOutside
      ? textWhenDupOutside
      : textWhenNotDup;
  }
};

export const checkBlank = (str: string) => {
  const frontBlankIdx = str.search(/\S/g);
  const backBlankIdx = str.search(/[\s\uFEFF\xA0]+$/g);

  const frontBlank =
    frontBlankIdx === -1 ? '' : str.substring(0, frontBlankIdx);

  const backBlank =
    backBlankIdx === -1 ? '' : str.substring(backBlankIdx, str.length);

  return { frontBlank, backBlank };
};

export const textWithMarkExcBlank = (selected: string, mark: string) => {
  const { frontBlank, backBlank } = checkBlank(selected);

  if (!frontBlank && !backBlank) {
    return mark + selected + mark;
  } else {
    return frontBlank + mark + selected.trim() + mark + backBlank;
  }
};
