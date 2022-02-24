import React from 'react';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { CustomHierarchyNode } from 'utils/api/mindmaps';
import {
  MindmapPreviewWrapper,
  StyledMindmapPreviewLink,
  StyledMindmapPreviewNodeRect,
  StyledMindmapPreviewSvg,
  StyledMindmapPreviewTree,
} from './MindmapPreview.styled';

interface MindmapPreviewProps {
  treeData: CustomHierarchyNode;
  className?: string;
}

const MindmapPreview = ({ treeData, className }: MindmapPreviewProps) => {
  return (
    <MindmapPreviewWrapper className={className}>
      <ParentSize>
        {({ width, height }) => {
          const parentSize = { width, height };

          return (
            <StyledMindmapPreviewSvg parentSize={parentSize}>
              <StyledMindmapPreviewTree root={treeData} parentSize={parentSize}>
                {tree => (
                  <Group top={5} left={5}>
                    {tree
                      .links()
                      .map(
                        (link, i) =>
                          link.target.depth < 4 && (
                            <StyledMindmapPreviewLink
                              key={`link-${i}`}
                              data={link}
                            />
                          )
                      )}
                    {tree.descendants().map((node, i) => {
                      switch (node.depth) {
                        case 0:
                          node.y = 5;
                          break;
                        case 1:
                          node.y = parentSize.width * 0.3;
                          break;
                        case 2:
                          node.y = parentSize.width * 0.55;
                          break;
                        case 3:
                          node.y = parentSize.width * 0.9;
                          break;

                        default:
                          break;
                      }

                      return (
                        node.depth < 4 && (
                          <StyledMindmapPreviewNodeRect
                            key={`${node.id}-${i}`}
                            node={node}
                          />
                        )
                      );
                    })}
                  </Group>
                )}
              </StyledMindmapPreviewTree>
            </StyledMindmapPreviewSvg>
          );
        }}
      </ParentSize>
    </MindmapPreviewWrapper>
  );
};

export default MindmapPreview;
