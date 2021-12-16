import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
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
    | 'italic';
  onClick?: () => void;
}

const StyledMdToolButton = styled.button`
  margin: 0.2em;
  padding: 0.2em;
  background-color: ${theme.colors.gray.light}90;
  width: 1.4em;
  height: 1.4em;
  border-radius: ${theme.borders.radius.square};
  ${theme.transition()}

  &:hover {
    background-color: ${theme.colors.gray.light};

    use {
      color: ${theme.colors.gray.dark};
    }
  }

  svg {
    width: 1em;
    height: 1em;
  }

  use {
    ${theme.transition()}
    color: ${theme.colors.gray.base};
    width: 100%;
    height: 100%;
  }
`;

const MdTool = ({ id, title, shape, onClick }: MdToolProps) => {
  return (
    <StyledMdToolButton type="button" onClick={onClick}>
      <svg>
        <use id={id} aria-label={title} xlinkHref={`${Sprite}#${shape}`} />
      </svg>
    </StyledMdToolButton>
  );
};

export default MdTool;
