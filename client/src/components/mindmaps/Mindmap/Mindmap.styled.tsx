import styled from 'styled-components';
import { Tree } from '@visx/hierarchy';
import { LinkHorizontal } from '@visx/shape';
import { setRainbowColor } from 'utils/style';
import { Group } from '@visx/group';
import theme from 'styles/theme';

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
  treeData;
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
  treeData;
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
      separation: (a, b) => setMindmapSeparation(a, b),
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

export const StyledMindmapLine = styled(
  LinkHorizontal
).attrs<StyledMindmapLineProps>(({ depth }) => ({
  stroke: setRainbowColor(depth),
}))<StyledMindmapLineProps>`
  stroke-width: 1;
  fill: none;
`;

/* ------------------------------ display name ------------------------------ */
MindmapWrapper.displayName = 'MindmapWrapper';
StyledMindmapSvg.displayName = 'StyledMindmapSvg';
StyledTree.displayName = 'StyledTree';
StyledMindmapTreeGroup.displayName = 'StyledMindmapTreeGroup';
StyledMindmapLine.displayName = 'StyledMindmapLine';
