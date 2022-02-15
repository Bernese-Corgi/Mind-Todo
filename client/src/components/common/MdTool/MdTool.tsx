import React, { useState } from 'react';
import useBlur from 'utils/hooks/useBlur';
import { ToolBox } from '..';
import { ToolTypes } from '../ToolBox/ToolBox';
import { MdToolButtonWrapper, StyledMdToolButton } from './MdTool.styled';
import Sprite from './sprites.svg';

interface MdToolProps {
  id?: string;
  title?: string;
  shape:
    | 'image'
    | 'bold'
    | 'link'
    | 'list-ol'
    | 'list-ul'
    | 'quote'
    | 'heading'
    | 'italic'
    | 'code';
  onClick?: () => void;
  toolbox?: ToolTypes[];
}

const MdTool = ({ id, title, shape, onClick, toolbox }: MdToolProps) => {
  const [hasToolbox, setHasToolbox] = useState(false);

  const handleClick = () => {
    toolbox ? setHasToolbox(!hasToolbox) : onClick && onClick();
  };

  const handleCloseToolbox = () => {
    setHasToolbox(false);
  };

  useBlur(e => {
    if (!e) return;

    if (!e.target.classList.contains('toolbox')) {
      setHasToolbox(false);
    }
  }, hasToolbox);

  return (
    <MdToolButtonWrapper>
      <StyledMdToolButton type="button" onClick={handleClick}>
        <svg>
          <use id={id} aria-label={title} xlinkHref={`${Sprite}#${shape}`} />
        </svg>
      </StyledMdToolButton>
      {toolbox && hasToolbox && (
        <ToolBox tools={toolbox} onCloseToolbox={handleCloseToolbox} />
      )}
    </MdToolButtonWrapper>
  );
};

export default MdTool;
