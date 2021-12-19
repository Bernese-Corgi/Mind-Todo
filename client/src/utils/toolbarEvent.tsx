import { RefObject } from 'react';

export const addMark = (
  editorRef: RefObject<HTMLTextAreaElement>,
  mark: string,
  location: 'first' | 'current'
) => {
  if (!editorRef.current) return;

  const { value, selectionStart, selectionEnd } = editorRef.current;

  const inputLen = value.length;
  const markLen = mark.length;

  if (selectionStart === undefined || selectionEnd === undefined) return;

  // 개행
  const prevN = value.lastIndexOf('\n', selectionStart - 1);
  const nextN = value.indexOf('\n', selectionStart);

  if (prevN === undefined || nextN === undefined) return;

  // 추가 형태
  if (location === 'first') {
    // ANCHOR 추가 형태 1. 맨 처음에 위치
    // insert text
    const beforeVal = value.substring(0, prevN + 1);
    const afterVal = value.substring(prevN + 1, inputLen);

    const hasMark = afterVal.startsWith(mark);

    if (hasMark) {
      editorRef.current.value =
        beforeVal + afterVal.substring(markLen, afterVal.length);
    } else {
      editorRef.current.value = beforeVal + mark + afterVal;

      if (nextN === -1) {
        editorRef.current.focus();
        editorRef.current.setSelectionRange(
          inputLen + markLen,
          inputLen + markLen
        );
      } else {
        editorRef.current.focus();
        editorRef.current.setSelectionRange(nextN + markLen, nextN + markLen);
      }
    }
  } else {
    // ANCHOR 추가 형태 2. 현재 위치에 위치
    const beforeVal = value.substring(0, selectionStart);
    const selectedVal = value.substring(selectionStart, selectionEnd);
    const afterVal = value.substring(selectionEnd, inputLen);

    // selectedVal에 마크가 존재하면 해제
    const hasMarkInFront = selectedVal.startsWith(mark);
    const hasMarkInBack = selectedVal.endsWith(mark);

    // 앞뒤에 마크가 존재하면 해제
    const frontDupIdx = beforeVal.lastIndexOf(mark);
    const backDupIdx = afterVal.indexOf(mark);

    if (hasMarkInFront && hasMarkInBack) {
      // selectedVal에 마크가 존재하면 해제
      editorRef.current.value =
        beforeVal +
        selectedVal.substring(markLen, selectedVal.length - markLen) +
        afterVal;

      editorRef.current.focus();
      editorRef.current.setSelectionRange(
        selectionStart,
        selectionEnd - markLen * 2
      );
    } else if (frontDupIdx !== -1 && backDupIdx !== -1) {
      // 앞뒤에 마크가 존재하면 해제
      const frontVal = beforeVal.substring(0, frontDupIdx);
      const backVal = afterVal.substring(markLen, inputLen);

      editorRef.current.value = frontVal + selectedVal + backVal;
      editorRef.current.focus();
      editorRef.current.setSelectionRange(
        selectionStart - markLen,
        selectionEnd - markLen
      );
    } else if (selectedVal) {
      // selectedVal이 존재할 때
      // selectedVal 앞뒤에 공백이 존재하면 공백을 제외하고 마크
      const frontBlank = /\S/g;
      const backBlank = /[\s\uFEFF\xA0]+$/g;

      const frontBlankIdx = selectedVal.search(frontBlank);
      const backBlankIdx = selectedVal.search(backBlank);

      const firstBlank =
        frontBlankIdx === -1 ? '' : selectedVal.substring(0, frontBlankIdx);

      const lastBlank =
        backBlankIdx === -1
          ? ''
          : selectedVal.substring(backBlankIdx, selectedVal.length);

      if (firstBlank || lastBlank) {
        editorRef.current.value =
          beforeVal +
          firstBlank +
          mark +
          selectedVal.trim() +
          mark +
          lastBlank +
          afterVal;

        editorRef.current.focus();

        const addedTextLen = selectionStart + firstBlank.length + markLen;

        editorRef.current.setSelectionRange(
          addedTextLen,
          addedTextLen + selectedVal.trim().length
        );
      } else {
        editorRef.current.value =
          beforeVal + mark + selectedVal + mark + afterVal;

        editorRef.current.focus();

        const addedTextLen = selectionStart + markLen;

        editorRef.current.setSelectionRange(
          addedTextLen,
          addedTextLen + selectedVal.length
        );
      }
    } else {
      //
      editorRef.current.value = beforeVal + mark + mark + afterVal;

      editorRef.current.focus();

      // 추가된 텍스트 가운데에 커서 위치
      const range = selectionStart + markLen; // TODO 함수화
      editorRef.current.setSelectionRange(range, range);
    }
  }
};

// const setCursor = () => {};
