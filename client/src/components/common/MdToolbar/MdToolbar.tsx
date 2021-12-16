import React, { RefObject } from 'react';
import { MdTool } from '..';
import { MdToolbarWrapper } from './MdToolbar.styled';

interface MdToolbarProps {
  editorRef: RefObject<HTMLTextAreaElement>;
}

const MdToolbar = ({ editorRef }: MdToolbarProps) => {
  const handleClicks = {
    bold: () => {
      const textVal = editorRef.current?.value;
      const textLen = textVal?.length;
      const selectStart = editorRef.current?.selectionStart;
      const selectEnd = editorRef.current?.selectionEnd;

      if (selectStart === undefined || selectEnd === undefined) return;
      if (!editorRef.current) return;

      const beforeText = textVal?.substring(0, selectStart);
      const selectedText = textVal?.substring(selectStart, selectEnd);
      const afterText = textVal?.substring(selectEnd, textLen);

      if (selectStart === selectEnd) {
        const addText = '****';
        editorRef.current.value = beforeText + addText + afterText;
        editorRef.current?.focus();
        editorRef.current?.setSelectionRange(selectStart + 2, selectStart + 2);
      } else {
        const addText = '**';
        editorRef.current.value =
          beforeText + addText + selectedText + addText + afterText;
        editorRef.current?.focus();
        editorRef.current?.setSelectionRange(selectEnd + 4, selectEnd + 4);
      }
    },
    italic: () => {
      const textVal = editorRef.current?.value;
      const textLen = textVal?.length;
      const selectStart = editorRef.current?.selectionStart;
      const selectEnd = editorRef.current?.selectionEnd;

      if (selectStart === undefined || selectEnd === undefined) return;
      if (!editorRef.current) return;

      const beforeText = textVal?.substring(0, selectStart);
      const selectedText = textVal?.substring(selectStart, selectEnd);
      const afterText = textVal?.substring(selectEnd, textLen);

      if (selectStart === selectEnd) {
        const addText = '**';
        editorRef.current.value = beforeText + addText + afterText;
        editorRef.current?.focus();
        editorRef.current?.setSelectionRange(selectStart + 1, selectStart + 1);
      } else {
        const addText = '*';
        editorRef.current.value =
          beforeText + addText + selectedText + addText + afterText;
        editorRef.current?.focus();
        editorRef.current?.setSelectionRange(selectEnd + 2, selectEnd + 2);
      }
    },
    heading: () => {
      const textVal = editorRef.current?.value;
      const textLen = textVal?.length;
      const selectStart = editorRef.current?.selectionStart;
      const selectEnd = editorRef.current?.selectionEnd;

      if (selectStart === undefined || selectEnd === undefined) return;
      if (!editorRef.current) return;

      const lastN = textVal?.lastIndexOf('\n', selectStart - 1);

      if (lastN) {
        const beforeText = textVal?.substring(0, lastN + 1);
        const afterText = textVal?.substring(lastN + 1, textLen);

        editorRef.current?.setSelectionRange(lastN + 1, lastN + 1);

        const addText = '# ';
        const addTextLen = addText.length;
        editorRef.current.value = beforeText + addText + afterText;

        const nextN = textVal?.indexOf('\n', selectStart);

        if (nextN === undefined || textLen === undefined) return;
        if (nextN === -1) {
          editorRef.current?.focus();
          editorRef.current?.setSelectionRange(
            textLen + addTextLen,
            textLen + addTextLen
          );
        } else {
          editorRef.current?.focus();
          editorRef.current?.setSelectionRange(nextN + 2, nextN + 2);
        }
      }
    },
    listOl: () => {
      const textVal = editorRef.current?.value;
      const textLen = textVal?.length;
      const selectStart = editorRef.current?.selectionStart;
      const selectEnd = editorRef.current?.selectionEnd;

      if (selectStart === undefined || selectEnd === undefined) return;
      if (!editorRef.current) return;

      const lastN = textVal?.lastIndexOf('\n', selectStart - 1);

      if (lastN) {
        const beforeText = textVal?.substring(0, lastN + 1);
        const afterText = textVal?.substring(lastN + 1, textLen);

        editorRef.current?.setSelectionRange(lastN + 1, lastN + 1);

        const addText = '1. ';
        const addTextLen = addText.length;
        editorRef.current.value = beforeText + addText + afterText;

        const nextN = textVal?.indexOf('\n', selectStart);

        if (nextN) {
          editorRef.current?.focus();
          if (nextN === -1 && textLen) {
            editorRef.current?.setSelectionRange(
              textLen + addTextLen,
              textLen + addTextLen
            );
          } else {
            editorRef.current?.setSelectionRange(
              nextN + addTextLen,
              nextN + addTextLen
            );
          }
        }
      }
    },
    listUl: () => {
      const textVal = editorRef.current?.value;
      const textLen = textVal?.length;
      const selectStart = editorRef.current?.selectionStart;
      const selectEnd = editorRef.current?.selectionEnd;

      if (selectStart === undefined || selectEnd === undefined) return;
      if (!editorRef.current) return;

      const lastN = textVal?.lastIndexOf('\n', selectStart - 1);

      if (lastN) {
        const beforeText = textVal?.substring(0, lastN + 1);
        const afterText = textVal?.substring(lastN + 1, textLen);

        editorRef.current?.setSelectionRange(lastN + 1, lastN + 1);

        const addText = '- ';
        const addTextLen = addText.length;
        editorRef.current.value = beforeText + addText + afterText;

        const nextN = textVal?.indexOf('\n', selectStart);

        if (nextN) {
          editorRef.current?.focus();
          if (nextN === -1 && textLen) {
            editorRef.current?.setSelectionRange(
              textLen + addTextLen,
              textLen + addTextLen
            );
          } else {
            editorRef.current?.setSelectionRange(
              nextN + addTextLen,
              nextN + addTextLen
            );
          }
        }
      }
    },
    link: () => {
      const textVal = editorRef.current?.value;
      const textLen = textVal?.length;
      const selectStart = editorRef.current?.selectionStart;
      const selectEnd = editorRef.current?.selectionEnd;

      if (selectStart === undefined || selectEnd === undefined) return;
      if (!editorRef.current) return;

      const nextN = textVal?.indexOf('\n', selectStart);

      const addText = '\n\n[Title](link)\n';
      const addTextLen = addText.length;

      if (nextN === undefined || textLen === undefined) return;

      if (nextN === -1) {
        const beforeText = textVal?.substring(0, selectStart);
        const afterText = textVal?.substring(selectStart, textLen);

        editorRef.current.value = beforeText + addText + afterText;

        editorRef.current?.focus();

        editorRef.current?.setSelectionRange(
          textLen + addTextLen - 6,
          textLen + addTextLen - 2
        );
      } else {
        const beforeText = textVal?.substring(0, nextN);
        const afterText = textVal?.substring(nextN, textLen);

        editorRef.current.value = beforeText + addText + afterText;

        editorRef.current?.focus();
        editorRef.current?.setSelectionRange(
          nextN + addTextLen - 6,
          nextN + addTextLen - 2
        );
      }
    },
    image: () => {
      const textVal = editorRef.current?.value;
      const textLen = textVal?.length;
      const selectStart = editorRef.current?.selectionStart;
      const selectEnd = editorRef.current?.selectionEnd;

      if (selectStart === undefined || selectEnd === undefined) return;
      if (!editorRef.current) return;

      const nextN = textVal?.indexOf('\n', selectStart);

      const addText = '\n\n![Title](link)\n';
      const addTextLen = addText.length;

      if (nextN === undefined || textLen === undefined) return;

      if (nextN === -1) {
        const beforeText = textVal?.substring(0, selectStart);
        const afterText = textVal?.substring(selectStart, textLen);

        editorRef.current.value = beforeText + addText + afterText;

        editorRef.current?.focus();

        editorRef.current?.setSelectionRange(
          textLen + addTextLen - 6,
          textLen + addTextLen - 2
        );
      } else {
        const beforeText = textVal?.substring(0, nextN);
        const afterText = textVal?.substring(nextN, textLen);

        editorRef.current.value = beforeText + addText + afterText;

        editorRef.current?.focus();
        editorRef.current?.setSelectionRange(
          nextN + addTextLen - 6,
          nextN + addTextLen - 2
        );
      }
    },
    quote: () => {
      const textVal = editorRef.current?.value;
      const textLen = textVal?.length;
      const selectStart = editorRef.current?.selectionStart;
      const selectEnd = editorRef.current?.selectionEnd;

      if (selectStart === undefined || selectEnd === undefined) return;
      if (!editorRef.current) return;

      const nextN = textVal?.indexOf('\n', selectStart);

      const addText = '\n\n> \n';
      const addTextLen = addText.length;

      if (nextN === undefined || textLen === undefined) return;

      if (nextN === -1) {
        const beforeText = textVal?.substring(0, selectStart);
        const afterText = textVal?.substring(selectStart, textLen);

        editorRef.current.value = beforeText + addText + afterText;

        editorRef.current?.focus();

        editorRef.current?.setSelectionRange(
          textLen + addTextLen - 1,
          textLen + addTextLen - 1
        );
      } else {
        const beforeText = textVal?.substring(0, nextN);
        const afterText = textVal?.substring(nextN, textLen);

        editorRef.current.value = beforeText + addText + afterText;

        editorRef.current?.focus();
        editorRef.current?.setSelectionRange(
          nextN + addTextLen - 1,
          nextN + addTextLen - 1
        );
      }
    },
  };
  return (
    <MdToolbarWrapper>
      <MdTool
        id="boldTool"
        title="굵게"
        shape="bold"
        onClick={handleClicks.bold}
      />
      <MdTool
        id="italicTool"
        title="기울이기"
        shape="italic"
        onClick={handleClicks.italic}
      />
      <MdTool
        id="headingTool"
        title="제목"
        shape="heading"
        onClick={handleClicks.heading}
      />
      <MdTool
        id="listOlTool"
        title="목록"
        shape="list-ol"
        onClick={handleClicks.listOl}
      />
      <MdTool
        id="listUlTool"
        title="순서 목록"
        shape="list-ul"
        onClick={handleClicks.listUl}
      />
      <MdTool
        id="linkTool"
        title="링크 삽입"
        shape="link"
        onClick={handleClicks.link}
      />
      <MdTool
        id="imageTool"
        title="이미지 삽입"
        shape="image"
        onClick={handleClicks.image}
      />
      <MdTool
        id="quoteTool"
        title="인용구 삽입"
        shape="quote"
        onClick={handleClicks.quote}
      />
    </MdToolbarWrapper>
  );
};

export default MdToolbar;
