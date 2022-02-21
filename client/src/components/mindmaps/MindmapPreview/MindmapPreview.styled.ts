import styled from 'styled-components';
import theme from 'styles/theme';
import { setRainbowColor } from 'utils/style';
import { Tree } from '@visx/hierarchy';
import { LinkHorizontal } from '@visx/shape';
import { HierarchyPointLink, HierarchyPointNode } from 'd3';

interface ParentSizeType {
  width: number;
  height: number;
}

export const MindmapPreviewWrapper = styled.div`
  background-color: ${theme.colors.primary.xlight};
`;

interface StyledMindmapPreviewSvgProps {
  parentSize: ParentSizeType;
}

export const StyledMindmapPreviewSvg = styled.svg.attrs<StyledMindmapPreviewSvgProps>(
  ({ parentSize }) => {
    return {
      width: parentSize.width,
      height: 0.5 * parentSize.width,
    };
  }
)<StyledMindmapPreviewSvgProps>``;

interface StyledMindmapPreviewTreeProps {
  parentSize: ParentSizeType;
}

export const StyledMindmapPreviewTree = styled(
  Tree
).attrs<StyledMindmapPreviewTreeProps>(({ parentSize: { width, height } }) => ({
  size: [height, width],
  separation: (a, b) => (a.parent === b.parent ? 1 : 1),
}))<StyledMindmapPreviewTreeProps>``;

interface StyledMindmapPreviewLinkProps {
  data: HierarchyPointLink<any>;
}

export const StyledMindmapPreviewLink = styled(
  LinkHorizontal
).attrs<StyledMindmapPreviewLinkProps>(({ data }) => {
  return {
    stroke: setRainbowColor(data.source.depth),
    strokeWidth: 1,
    fill: 'none',
  };
})<StyledMindmapPreviewLinkProps>``;

interface StyledMindmapPreviewNodeRectProps {
  node: HierarchyPointNode<unknown>;
}

export const StyledMindmapPreviewNodeRect = styled.rect.attrs<StyledMindmapPreviewNodeRectProps>(
  ({ node }) => ({
    x: node.y,
    y: node.x - 10,
    rx: 5,
    width: '2.3em',
    height: '1.2em',
    fill: setRainbowColor(node.depth),
    fillOpacity: 0.8,
  })
)<StyledMindmapPreviewNodeRectProps>``;
