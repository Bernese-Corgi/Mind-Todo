import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { handleColorType, handleHoverColorType } from 'utils/style';
import Sprite from './assets/sprites.svg';

export type IconProps = {
  id?: string;
  title?: string;
  shape: string;
  color?: string;
  size?: { width: string | number; height: string | number };
  onClick?: () => void;
};

const Svg = styled.svg<IconProps>`
  ${({ color, shape, onClick, size }) => css`
    color: ${handleColorType(color)};
    width: ${size?.width ? size.width : '1em'};
    height: ${size?.height ? size.height : '1em'};
    ${theme.transition()}

    &:hover {
      color: ${handleHoverColorType(shape, color)};
      cursor: ${onClick ? 'pointer' : 'initial'};
    }
  `}
`;

const Icon = ({
  id,
  title,
  shape,
  color,
  size,
  onClick,
  ...restProps
}: IconProps) => {
  return (
    <>
      <Svg id={id} color={color} shape={shape} size={size} onClick={onClick}>
        <use
          id={id}
          aria-label={title}
          xlinkHref={`${Sprite}#icon-${shape}`}
          width={size?.width}
          height={size?.height}
        />
      </Svg>
    </>
  );
};

export default Icon;
