import React from 'react';
import styled, { css } from 'styled-components';
import { handleColorType, handleHoverColorType } from 'utils/style';
import Sprite from './assets/sprites.svg';

interface IconProps {
  id?: string;
  title?: string;
  shape: string;
  color?: string;
}

const Svg = styled.svg<IconProps>`
  ${({ color, shape }) => css`
    color: ${handleColorType(color)};
    width: 1em;
    height: 1em;
    transition: 200ms;
    transition-timing-function: ease-in-out;
    -webkit-transition: 200ms;
    -webkit-transition-timing-function: ease-in-out;

    &:hover {
      color: ${handleHoverColorType(shape)};
    }
  `}
`;

const Icon = ({ id, title, shape, color }: IconProps) => {
  return (
    <>
      <Svg id={id} color={color} shape={shape}>
        <use id={id} xlinkHref={`${Sprite}#icon-${shape}`} aria-label={title} />
      </Svg>
    </>
  );
};

export default Icon;
