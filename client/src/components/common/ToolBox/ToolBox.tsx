import React from 'react';
import { ImgUploadBtnContainer } from 'container/common';
import { changeFirstStrToUpper } from 'utils/stringUtils';
import { StyledToolBoxItemLi, StyledToolBoxUl } from './ToolBox.styled';

interface ToolBoxProps {
  tools: ToolTypes[];
}

export interface ToolBoxItemProps {
  tool: ToolTypes;
}

export type ToolTypes = {
  content: string;
  type?: string;
  onClick: () => void;
  getUrlandSetInput?: (url: string) => void;
};

const ToolBoxItem = ({ tool }: ToolBoxItemProps) => {
  const { content, type, onClick, getUrlandSetInput } = tool;
  // TODO 1. 버튼이 이미지인 경우 추가하기
  // TODO 2. type이 file인 경우 ImgUploadBtn 렌더링하기
  return (
    <StyledToolBoxItemLi className="toolbox">
      {type === 'file' ? (
        <ImgUploadBtnContainer
          id={`${content}ToolboxItem`}
          label={content}
          className="toolbox"
          getUrlandSetInput={getUrlandSetInput}
        />
      ) : (
        <button
          id={`add${changeFirstStrToUpper(content)}Btn`}
          type="button"
          onClick={onClick}
          className="toolbox">
          {content}
        </button>
      )}
    </StyledToolBoxItemLi>
  );
};

const ToolBox = ({ tools }: ToolBoxProps) => {
  return (
    <StyledToolBoxUl className="toolbox">
      {tools.map((tool, i) => {
        return <ToolBoxItem key={i} tool={tool} />;
      })}
    </StyledToolBoxUl>
  );
};

export default ToolBox;
