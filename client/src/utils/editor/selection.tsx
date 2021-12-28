export const setSelection = (
  textarea: HTMLTextAreaElement,
  start: number,
  end: number
) => {
  textarea.focus();
  textarea.setSelectionRange(start, end);
};

export const getTextareaState = (
  textarea: HTMLTextAreaElement,
  location: 'start' | 'current'
) => {
  const { value, selectionStart, selectionEnd } = textarea;

  const valueLen = value.length;

  const prevLine = value.lastIndexOf('\n', selectionStart - 1);
  const nextLine = value.indexOf('\n', selectionStart);

  const commonState = {
    value,
    valueLen,
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
        afterVal: value.substring(prevLine + 1, valueLen),
      };
    case 'current':
      return {
        ...commonState,
        beforeVal: value.substring(0, selectionStart),
        selectedVal: value.substring(selectionStart, selectionEnd),
        afterVal: value.substring(selectionEnd, valueLen),
      };
    default:
      return {
        ...commonState,
        beforeVal: value.substring(0, selectionStart),
        selectedVal: value.substring(selectionStart, selectionEnd),
        afterVal: value.substring(selectionEnd, valueLen),
      };
  }
};

export const textWithMarkExcDuplication = (
  textarea: HTMLTextAreaElement,
  mark: string,
  location: 'start' | 'current',
  selectedRange?: { start: number; end: number }
) => {
  const markLen = mark.length;

  if (location === 'start') {
    const { beforeVal, afterVal, selection } = getTextareaState(
      textarea,
      'start'
    );

    const hasMark = afterVal.startsWith(mark);

    return {
      editedValue: hasMark
        ? beforeVal + afterVal.substring(markLen, afterVal.length)
        : beforeVal + mark + afterVal,
      editedSelection: {
        start: selectedRange
          ? selectedRange.start
          : hasMark
          ? selection.start - markLen
          : selection.start + markLen,
        end: selectedRange
          ? selectedRange.end
          : hasMark
          ? selection.end - markLen
          : selection.end + markLen,
      },
    };
  } else {
    const { valueLen, beforeVal, afterVal, selectedVal, selection } =
      getTextareaState(textarea, 'current');

    const hasMarkInside =
      selectedVal.startsWith(mark) && selectedVal.endsWith(mark);

    const hasMarkOutside =
      beforeVal.lastIndexOf(mark) !== -1 && afterVal.indexOf(mark) !== -1;

    const textWhenDupInside =
      beforeVal + selectedVal.substring(markLen, selectedVal.length - markLen);

    const textWhenDupOutside =
      beforeVal.substring(0, beforeVal.lastIndexOf(mark)) +
      selectedVal +
      afterVal.substring(markLen, valueLen);

    const textWhenNotDup = beforeVal + mark + selectedVal + mark + afterVal;

    return {
      editedValue: hasMarkInside
        ? textWhenDupInside
        : hasMarkOutside
        ? textWhenDupOutside
        : textWhenNotDup,
      editedSelection: {
        start: selectedRange
          ? selectedRange.start
          : hasMarkInside
          ? selection.start
          : hasMarkOutside
          ? selection.start - markLen
          : selection.start + markLen,
        end: selectedRange
          ? selectedRange.end
          : hasMarkInside
          ? selection.end - markLen * 2
          : hasMarkOutside
          ? selection.end - markLen
          : selection.end + markLen,
      },
    };
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
