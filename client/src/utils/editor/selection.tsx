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
