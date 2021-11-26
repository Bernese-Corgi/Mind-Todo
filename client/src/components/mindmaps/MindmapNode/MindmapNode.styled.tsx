import { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';
import { Group } from '@visx/group';
import theme from 'styles/theme';
import { handleHoverColorType, setRainbowColor } from 'utils/style';
import Sprite from 'components/common/Icon/assets/sprites.svg';

/* ---------------------------- variables, utils ---------------------------- */
// font size
const fontSize = 11;
const fontSizeToString = `${fontSize / 10}em`;

// add button size & offset
const addBtnSize = 25;
const addBtnPad = addBtnSize / 5;

// calc add button offset
const calcTopOffset = addBtnSize * (addBtnSize * 0.04 - 5.5) * 0.2;
const calcLeftOffset = (textwidth: number) => textwidth + 12;

// util for get text width
const getNodeTextBoxSize = (size: number | undefined) => size && size + 12;

/* --------------------------- text + button group -------------------------- */
interface StyledNodeGroupProps {
  node;
  textsize: { width: number; height: number };
}

export const StyledNodeGroup = styled(Group).attrs<StyledNodeGroupProps>(
  ({ node, textsize }) => ({
    top: node.x,
    left: node.y - textsize.width / 2,
  })
)<StyledNodeGroupProps>`
  font-size: 1rem;

  &:hover {
    .addGroup {
      opacity: 1;
    }
  }
`;

/* ------------------------------- text group ------------------------------- */
// text group
interface StyledTextGroupProps {
  onClick?: (e: MouseEventHandler<SVGGElement>) => void;
}

export const StyledTextGroup = styled(Group)<StyledTextGroupProps>`
  ${theme.transition()}

  &:hover {
    cursor: pointer;
  }
`;

// text
export const StyledNodeText = styled.text.attrs(props => ({
  dy: '-0.5em',
  className: 'nodeText',
}))`
  font-size: ${fontSizeToString};
  font-weight: 600;
`;

// text box
interface StyledTextBoxProps {
  node;
  textsize: { width: number; height: number };
}

export const StyledNodeTextBox = styled.rect.attrs<StyledTextBoxProps>(
  ({ node, textsize }) => {
    return {
      width: getNodeTextBoxSize(textsize.width),
      height: getNodeTextBoxSize(textsize.height),
      x: 0,
      y: '-2.2em',
      rx: theme.borders.radius.square,
      fill: setRainbowColor(node.depth),
    };
  }
)<StyledTextBoxProps>`
  opacity: 0.5;
  ${theme.transition()}

  ${StyledTextGroup}:hover & {
    opacity: 0.8;
  }
`;

/* ------------------------------- add button ------------------------------- */
// add button group
interface StyledAddGroupProps {
  node;
  shape?: string;
  color?: string;
  onClick?: (e: MouseEventHandler<SVGGElement>) => void;
  textsize: { width: number; height: number };
}

export const StyledAddGroup = styled(Group).attrs<StyledAddGroupProps>(
  ({ node, textsize }) => ({
    top: calcTopOffset,
    left: calcLeftOffset(textsize.width),
    className: 'addGroup',
  })
)<StyledAddGroupProps>`
  opacity: 0;
  ${theme.transition()}

  ${({ node, shape }) => css`
    &:hover {
      cursor: pointer;
      opacity: 1;

      use {
        color: ${handleHoverColorType(shape, setRainbowColor(node.depth))};
      }
    }
  `}
`;

// add button icon
interface StyledAddUseIconProps {
  node;
  shape?: string;
  color?: string;
}

export const StyledAddUseIcon = styled('use').attrs<StyledAddUseIconProps>(
  ({ shape }) => ({
    ariaLabel: '하위 노드 추가하기',
    xlinkHref: `${Sprite}#icon-${shape}`,
    x: addBtnSize * 0.1,
    y: addBtnSize * 0.1,
    width: addBtnSize - addBtnPad,
    height: addBtnSize - addBtnPad,
  })
)<StyledAddUseIconProps>`
  fill: inherit;
  ${theme.transition()}
`;

// add button click range
export const StyledAddWrapRect = styled.rect.attrs(() => ({
  width: addBtnSize,
  height: addBtnSize,
}))`
  fill: transparent;
`;

/* ------------------------------ display name ------------------------------ */
StyledNodeGroup.displayName = 'StyledNodeGroup';
StyledTextGroup.displayName = 'StyledTextGroup';
StyledNodeText.displayName = 'StyledNodeText';
StyledNodeTextBox.displayName = 'StyledNodeTextBox';
StyledAddGroup.displayName = 'StyledAddGroup';
StyledAddUseIcon.displayName = 'StyledAddUseIcon';
StyledAddWrapRect.displayName = 'StyledAddWrapRect';
