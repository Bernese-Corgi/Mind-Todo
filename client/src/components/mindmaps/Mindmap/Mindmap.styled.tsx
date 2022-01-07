import styled from 'styled-components';
import { Tree } from '@visx/hierarchy';
import { LinkHorizontal } from '@visx/shape';
import { setRainbowColor } from 'utils/style';
import { Group } from '@visx/group';
import theme from 'styles/theme';
import { HierarchyPointLink } from '@visx/hierarchy/lib/types';
import {
  CustomHierarchyNode,
  CustomHierarchyPointNode,
} from 'utils/api/mindmaps';

/* ---------------------------- variable and util --------------------------- */
const margin = { top: 10, left: 80, right: 80, bottom: 10 };

const setMindmapSeparation = (a, b) => (a.x < b.x ? 1 : 1);

const setMindmapSize = (treeData, parentSize) => {
  const mWidth = treeData.height > 6 ? 1440 : parentSize.width;
  const mHeight = treeData.children?.length > 5 ? 700 : parentSize.height;

  return { mWidth, mHeight };
};

/* ----------------------------- mindmap wrapper ---------------------------- */
interface MindmapWrapperProps {
  treeData: CustomHierarchyNode;
}

export const MindmapWrapper = styled.div<MindmapWrapperProps>`
  width: 100%;
  height: 100%;
  overflow: auto;
  border-radius: ${theme.borders.radius.square};
  background-color: ${theme.colors.primary.light}50;
`;

/* ------------------------------- mindmap svg ------------------------------ */
interface StyledMindmapSvgProps {
  parentSize: { width: number; height: number };
  treeData: CustomHierarchyNode;
}

export const StyledMindmapSvg = styled.svg.attrs<StyledMindmapSvgProps>(
  ({ parentSize, treeData }) => {
    const { mWidth, mHeight } = setMindmapSize(treeData, parentSize);

    return {
      width: mWidth,
      height: mHeight,
    };
  }
)<StyledMindmapSvgProps>`
  overflow: auto;
`;

/* ---------------------------------- Tree ---------------------------------- */
interface StyledTreeProps {
  parentSize: { width: number; height: number };
}

export const StyledTree = styled(Tree).attrs<StyledTreeProps>(
  ({ root, parentSize }) => {
    const { mWidth, mHeight } = setMindmapSize(root, parentSize);
    const treeSize = {
      width: mHeight - margin.top - margin.bottom,
      height: mWidth - margin.right - margin.left,
    };
    return {
      size: [treeSize.width, treeSize.height],
      top: 0,
      left: 0,
      separation: (a: CustomHierarchyPointNode, b: CustomHierarchyPointNode) =>
        setMindmapSeparation(a, b),
    };
  }
)<StyledTreeProps>`
  fill: ${theme.colors.gray.dark};
`;

// group for wrap line and node
export const StyledMindmapTreeGroup = styled(Group).attrs(() => ({
  top: margin.top,
  left: margin.left,
}))``;

/* ---------------------------------- line ---------------------------------- */
interface StyledMindmapLineProps {
  depth: number;
}

export const StyledMindmapHorizontalLine = styled(
  LinkHorizontal
).attrs<StyledMindmapLineProps>(({ depth }) => ({
  stroke: setRainbowColor(depth),
}))<StyledMindmapLineProps>`
  stroke-width: 1;
  fill: none;
`;

interface StyledMindmapVerLineProps {
  depth: number;
  data: HierarchyPointLink<any>;
  index: number;
}

const setLocation = (data: HierarchyPointLink<any>, index: number) => {
  if (!data.source.children) return;

  const root = data.source;
  const prev = index === 0 ? root : data.source.children[index - 1];
  const next = data.source.children[index];

  return {
    x1: prev ? prev.y : 0,
    y1: prev ? prev.x : 0,
    x2: next ? next.y : 0,
    y2: next ? next.x : 0,
  };
};

const definePath = (
  { x1, x2, y1, y2 }: { x1: number; x2: number; y1: number; y2: number },
  diff: number,
  i: number
) => {
  const quarter = (y2 - y1) / 4;
  const isOdd = i % 2 !== 0;

  return isOdd
    ? `M${x1},${y1} C${x1 + diff},${y1 + quarter} ${x1 + diff},${
        y2 - quarter
      } ${x2},${y2}`
    : `M${x1},${y1} C${x1 - diff},${y1 + quarter} ${x1 - diff},${
        y2 - quarter
      } ${x2},${y2}`;
};

export const StyledMindmapVerticalLine = styled.path.attrs<StyledMindmapVerLineProps>(
  ({ depth, data, index }) => {
    const x1 = setLocation(data, index)?.x1 || 0;
    const y1 = setLocation(data, index)?.y1 || 0;
    const x2 = setLocation(data, index)?.x2 || 0;
    const y2 = setLocation(data, index)?.y2 || 0;

    const diff = 20;

    return {
      stroke: setRainbowColor(depth),
      d: definePath({ x1, x2, y1, y2 }, diff, index),
    };
  }
)<StyledMindmapVerLineProps>`
  stroke-width: 1;
  fill: none;
`;

/* ------------------------------ display name ------------------------------ */
MindmapWrapper.displayName = 'MindmapWrapper';
StyledMindmapSvg.displayName = 'StyledMindmapSvg';
StyledTree.displayName = 'StyledTree';
StyledMindmapTreeGroup.displayName = 'StyledMindmapTreeGroup';
StyledMindmapHorizontalLine.displayName = 'StyledMindmapHorizontalLine';
