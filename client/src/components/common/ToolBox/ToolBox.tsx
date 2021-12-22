import React from 'react';
import { changeFirstStrToUpper } from 'utils/stringUtils';
import { StyledToolBoxItemLi, StyledToolBoxUl } from './ToolBox.styled';

interface ToolBoxProps {
  tools: {
    content: string;
    clickEvent: () => void;
  }[];
}

interface ToolBoxItemProps {
  content: string;
  onClick: () => void;
}

const ToolBoxItem = ({ content, onClick }: ToolBoxItemProps) => {
  return (
    <StyledToolBoxItemLi className="toolbox">
      <button
        id={`add${changeFirstStrToUpper(content)}Btn`}
        type="button"
        onClick={onClick}
        className="toolbox">
        {content}
      </button>
    </StyledToolBoxItemLi>
  );
};

const ToolBox = ({ tools }: ToolBoxProps) => {
  return (
    <StyledToolBoxUl className="toolbox">
      {tools.map(({ content, clickEvent }, i) => {
        return <ToolBoxItem content={content} key={i} onClick={clickEvent} />;
      })}
    </StyledToolBoxUl>
  );
};

export default ToolBox;
