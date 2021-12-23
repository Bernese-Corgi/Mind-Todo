export const setSelection = (
  textarea: HTMLTextAreaElement,
  range: { start: number; end: number }
) => {
  textarea.focus();
  textarea.setSelectionRange(range.start, range.end);
};
