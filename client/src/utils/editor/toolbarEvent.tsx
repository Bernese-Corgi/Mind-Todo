import {
  checkBlank,
  getTextareaState,
  setSelection,
  textWithMarkExcBlank,
  textWithMarkExcDuplication,
} from './selection';

export const insertMark = {
  lineStart: (
    textarea: HTMLTextAreaElement,
    mark: string,
    selectedRange?: { start: number; end: number }
  ) => {
    const { editedValue, editedSelection } = textWithMarkExcDuplication(
      textarea,
      mark,
      'start',
      selectedRange
    );

    textarea.value = editedValue;
    setSelection(textarea, editedSelection.start, editedSelection.end);
  },
  current: (
    textarea: HTMLTextAreaElement,
    mark: string,
    selectedRange?: { start: number; end: number }
  ) => {
    const markLen = mark.length;

    const {
      beforeVal,
      afterVal,
      selectedVal,
      selection: { start },
    } = getTextareaState(textarea, 'current');

    const { frontBlank, backBlank } = checkBlank(selectedVal);

    if (!!frontBlank || !!backBlank) {
      textarea.value =
        beforeVal + textWithMarkExcBlank(selectedVal, mark) + afterVal;

      setSelection(
        textarea,
        start + frontBlank.length + markLen,
        start + frontBlank.length + markLen + selectedVal.trim().length
      );
    } else {
      const { editedValue, editedSelection } = textWithMarkExcDuplication(
        textarea,
        mark,
        'current',
        selectedRange
      );

      textarea.value = editedValue;
      setSelection(textarea, editedSelection.start, editedSelection.end);
    }
  },
};
