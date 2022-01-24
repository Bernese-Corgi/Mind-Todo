import React, { RefObject } from 'react';
import { getTextareaState } from 'utils/editor/selection';
import { insertMark } from 'utils/editor/toolbarEvent';
import { MdTool } from '..';
import { MdToolbarWrapper } from './MdToolbar.styled';

interface MdToolbarProps {
  editorRef: RefObject<HTMLTextAreaElement>;
}

const MdToolbar = ({ editorRef }: MdToolbarProps) => {
  const handleClicks = {
    bold: () => {
      editorRef.current && insertMark.current(editorRef.current, '**');
    },
    italic: () => {
      editorRef.current && insertMark.current(editorRef.current, '*');
    },
    heading: () => {
      editorRef.current && insertMark.lineStart(editorRef.current, '# ');
    },
    listOl: () => {
      editorRef.current && insertMark.lineStart(editorRef.current, '1. ');
    },
    listUl: () => {
      editorRef.current && insertMark.lineStart(editorRef.current, '- ');
    },
    link: () => {
      if (!editorRef.current) return;

      const mark = '\n[Title](link)\n';
      const markLen = mark.length;

      const { nextLine } = getTextareaState(editorRef.current, 'start');

      insertMark.lineStart(editorRef.current, mark, {
        start: nextLine + markLen - 6,
        end: nextLine + markLen - 2,
      });
      // const textVal = editorRef.current?.value;
      // const textLen = textVal?.length;
      // const selectStart = editorRef.current?.selectionStart;
      // const selectEnd = editorRef.current?.selectionEnd;
      // if (selectStart === undefined || selectEnd === undefined) return;
      // if (!editorRef.current) return;
      // const nextN = textVal?.indexOf('\n', selectStart);
      // const addText = '\n\n[Title](link)\n';
      // const addTextLen = addText.length;
      // if (nextN === undefined || textLen === undefined) return;
      // if (nextN === -1) {
      //   const beforeText = textVal?.substring(0, selectStart);
      //   const afterText = textVal?.substring(selectStart, textLen);
      //   editorRef.current.value = beforeText + addText + afterText;
      //   editorRef.current?.focus();
      //   editorRef.current?.setSelectionRange(
      //     textLen + addTextLen - 6,
      //     textLen + addTextLen - 2
      //   );
      // } else {
      //   const beforeText = textVal?.substring(0, nextN);
      //   const afterText = textVal?.substring(nextN, textLen);
      //   editorRef.current.value = beforeText + addText + afterText;
      //   editorRef.current?.focus();
      //   editorRef.current?.setSelectionRange(
      //     nextN + addTextLen - 6,
      //     nextN + addTextLen - 2
      //   );
      // }
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
    code: () => {
      // addMark(editorRef, '```\n```', 'first');
    },
  };

  const array = [
    {
      content: 'H1',
      clickEvent: () => {
        // addMark(editorRef, '# ', 'first');
        editorRef.current && insertMark.lineStart(editorRef.current, '# ');
      },
    },
    {
      content: 'H2',
      clickEvent: () => {
        // addMark(editorRef, '## ', 'first');
        editorRef.current && insertMark.lineStart(editorRef.current, '## ');
      },
    },
    {
      content: 'H3',
      clickEvent: () => {
        // addMark(editorRef, '### ', 'first');
        editorRef.current && insertMark.lineStart(editorRef.current, '### ');
      },
    },
  ];

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
        toolbox={array}
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
      <MdTool
        id="codeTool"
        title="코드 블럭 삽입"
        shape="code"
        onClick={handleClicks.code}
      />
    </MdToolbarWrapper>
  );
};

export default MdToolbar;
