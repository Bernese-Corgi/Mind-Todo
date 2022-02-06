import React from 'react';
import { changeFirstStrToUpper } from 'utils/stringUtils';
import { ImgUploadBtn } from '..';
import { StyledToolBoxItemLi, StyledToolBoxUl } from './ToolBox.styled';

interface ToolBoxProps {
  tools: {
    content: string;
    type?: string;
    clickEvent: () => void;
  }[];
}

interface ToolBoxItemProps {
  content: string;
  type?: string;
  onClick: () => void;
}

const ToolBoxItem = ({ content, type, onClick }: ToolBoxItemProps) => {
  // TODO 1. 버튼이 이미지인 경우 추가하기
  // TODO 2. type이 file인 경우 ImgUploadBtn 렌더링하기
  return (
    <StyledToolBoxItemLi className="toolbox">
      {type === 'file' ? (
        <ImgUploadBtn id="" label={content} className="toolbox" />
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
      {tools.map(({ content, type, clickEvent }, i) => {
        return (
          <ToolBoxItem
            content={content}
            type={type}
            key={i}
            onClick={clickEvent}
          />
        );
      })}
    </StyledToolBoxUl>
  );
};

export default ToolBox;
