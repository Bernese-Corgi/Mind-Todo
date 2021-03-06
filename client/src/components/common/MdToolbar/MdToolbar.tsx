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
      editorRef.current && insertMark.lineStart(editorRef.current, '```\n```');
    },
  };

  const headingToolbox = [
    {
      content: 'H1',
      onClick: () => {
        editorRef.current && insertMark.lineStart(editorRef.current, '# ');
      },
    },
    {
      content: 'H2',
      onClick: () => {
        editorRef.current && insertMark.lineStart(editorRef.current, '## ');
      },
    },
    {
      content: 'H3',
      onClick: () => {
        editorRef.current && insertMark.lineStart(editorRef.current, '### ');
      },
    },
  ];

  const imageToolbox = [
    {
      content: 'file',
      type: 'file',
      onClick: () => {},
      getUrlandSetInput: (url: string) => {
        editorRef.current &&
          insertMark.lineStart(editorRef.current, `![image](${url})`);
      },
    },
    {
      content: 'url',
      onClick: () => {
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
    },
  ];

  return (
    <MdToolbarWrapper>
      <MdTool
        id="boldTool"
        title="??????"
        shape="bold"
        onClick={handleClicks.bold}
      />
      <MdTool
        id="italicTool"
        title="????????????"
        shape="italic"
        onClick={handleClicks.italic}
      />
      <MdTool
        id="headingTool"
        title="??????"
        shape="heading"
        onClick={handleClicks.heading}
        toolbox={headingToolbox}
      />
      <MdTool
        id="listOlTool"
        title="??????"
        shape="list-ol"
        onClick={handleClicks.listOl}
      />
      <MdTool
        id="listUlTool"
        title="?????? ??????"
        shape="list-ul"
        onClick={handleClicks.listUl}
      />
      <MdTool
        id="linkTool"
        title="?????? ??????"
        shape="link"
        onClick={handleClicks.link}
      />
      <MdTool
        id="imageTool"
        title="????????? ??????"
        shape="image"
        onClick={handleClicks.image}
        toolbox={imageToolbox}
      />
      <MdTool
        id="quoteTool"
        title="????????? ??????"
        shape="quote"
        onClick={handleClicks.quote}
      />
      <MdTool
        id="codeTool"
        title="?????? ?????? ??????"
        shape="code"
        onClick={handleClicks.code}
      />
    </MdToolbarWrapper>
  );
};

export default MdToolbar;
