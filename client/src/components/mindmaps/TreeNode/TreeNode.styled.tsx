import { Group } from '@visx/group';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import Sprite from 'components/common/Icon/assets/sprites.svg';
import { handleColorType, handleHoverColorType } from 'utils/style';
import { MouseEventHandler } from 'react';

interface StyledNodeProps {
  node?: any;
  onClickAddButton?: (
    e: MouseEventHandler<SVGGElement>,
    parentId: string
  ) => void;
  onClickNode?: any;
  styleObj?: any;
}

interface StyledAddGroupProps {
  node;
  shape?: string;
  color?: string;
  onClick?: (e: MouseEventHandler<SVGGElement>) => void;
}

const StyledNodeGroup = styled(Group)<StyledNodeProps>`
  ${({ node }) => css`
    .textBgRect {
      fill: ${handleColorType(setRainbowColor(node.depth))};
      ${theme.transition()}
    }

    &:hover {
      .addChildNodeBtn {
        opacity: 100;
      }

      .textBgRect {
        /*  */
        fill: ${`${handleHoverColorType('', setRainbowColor(node.depth))}`};
        cursor: pointer;
      }

      .nodeText {
        fill: black;
        cursor: pointer;
      }
    }
  `}
`;

const StyledAddGroup = styled(Group)<StyledAddGroupProps>`
  ${({ node, color, shape, onClick }) => {
    return css`
      opacity: 0;
      use {
        ${theme.transition()}
      }

      &:hover {
        cursor: pointer;

        use {
          color: ${handleHoverColorType(shape, setRainbowColor(node.depth))};
        }
      }
    `;
  }}
`;
/* ------------------------------- style utils ------------------------------ */
// add button
export const addBtnSize = { width: 30, height: 30 };
export const addBtnPad = 5;

export const calcBtnSize = (
  totalSize: { width: number; height: number },
  padding: number
) => ({
  width: totalSize.width - padding * 2,
  height: totalSize.height - padding * 2,
});

// length
export const getTextLength = node => node.data?.node.name.length;

// color
export const setRainbowColor = (number: number) =>
  theme.colors.rainbow[number] || theme.colors.gray.light;
/* ------------------------------------------------------------------------- */

export const DefaultNode = ({
  node,
  onClickAddButton,
  onClickNode,
  styleObj,
}) => {
  const { nodeId } = node.data.node;
  // console.log(node);

  return (
    <StyledNodeGroup top={node.x} left={node.y} node={node}>
      {/* hover를 위한 박스 속성 */}
      <Group onClick={e => onClickNode(e, nodeId)}>
        <rect
          width={getTextLength(node) * 9 + addBtnSize.width}
          height="3em"
          x={-3 - 5 /* TODO padding값으로 빼기 */}
          y={-17 - 5}
          rx={theme.borders.radius.square}
          // fill={styleObj.bgColor}
          fill="transparent"
        />
        <rect
          className="textBgRect"
          width={getTextLength(node) * 8}
          height="2em"
          x={-3}
          y={-17}
          rx={theme.borders.radius.square}
          // fill={setRainbowColor(node.depth)}
        />
        <text className="nodeText" dx="0.33em" dy="-0.33em">
          {node.data.node.name}
        </text>
      </Group>
      <StyledAddGroup
        className="addChildNodeBtn"
        node={node}
        top={-23}
        left={getTextLength(node) * 7}
        width={addBtnSize.width}
        height={addBtnSize.height}
        shape="plus"
        // color={setRainbowColor(node.depth)}
        // onClick={onClickAddButton}
        onClick={e => {
          console.log(node);
          onClickAddButton(e, nodeId);
        }}>
        <use
          aria-label="하위 노드 추가하기"
          xlinkHref={`${Sprite}#icon-plus`}
          width={calcBtnSize(addBtnSize, addBtnPad).width}
          height={calcBtnSize(addBtnSize, addBtnPad).height}
          color="inherit"
          x={addBtnPad}
          y={addBtnPad}
        />
        <rect
          width={addBtnSize.width}
          height={addBtnSize.height}
          viewBox={`0 0 ${addBtnSize.width} ${addBtnSize.height}`}
          // fill={`${theme.colors.gray.dark}50`}
          fill="transparent"
        />
      </StyledAddGroup>
    </StyledNodeGroup>
  );
};

export const StyledNode = styled(DefaultNode)<StyledNodeProps>`
  font-size: inherit;
`;

StyledNodeGroup.displayName = 'StyledNodeGroup';
StyledAddGroup.displayName = 'StyledAddGroup';
StyledNode.displayName = 'StyledNode';
