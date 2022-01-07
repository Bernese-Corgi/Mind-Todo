import React, { MouseEventHandler, useRef } from 'react';
/* component ------------------------------- */
import {
  MindmapWrapper,
  StyledMindmapTreeGroup,
  StyledTree,
  StyledMindmapSvg,
  StyledMindmapVerticalLine,
  StyledMindmapHorizontalLine,
} from './Mindmap.styled';
import { MindmapNode } from '..';
/* visx ---------------------------------- */
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { CustomHierarchyNode } from 'utils/api/mindmaps';
import { HierarchyPointNode } from '@visx/hierarchy/lib/types';

interface MindmapProps {
  treeData: CustomHierarchyNode;
  onClickAddButton: (
    e: MouseEventHandler<SVGGElement>,
    parentId: string
  ) => void;
  onClickNode: (e: MouseEventHandler<SVGGElement>, nodeId: string) => void;
}

const Mindmap = ({ treeData, onClickAddButton, onClickNode }: MindmapProps) => {
  const nodeRef = useRef<HierarchyPointNode<any>>();

  return (
    <MindmapWrapper treeData={treeData} className="mindmap-wrapper">
      <ParentSize className="parent-size">
        {({ width, height }) => (
          <StyledMindmapSvg
            className="mindmap-svg"
            parentSize={{ width, height }}
            treeData={treeData}>
            {/* Tree */}
            <StyledTree root={treeData} parentSize={{ width, height }}>
              {tree => (
                <StyledMindmapTreeGroup>
                  {/* link line ---------------------------------- */}
                  <Group id="mindmapLineGroup">
                    {tree
                      .links()
                      .map((link, i) =>
                        link.source.depth === 0 ? (
                          <StyledMindmapVerticalLine
                            key={`link-${i}`}
                            data={link}
                            index={i}
                            depth={link.source.depth}
                          />
                        ) : (
                          <StyledMindmapHorizontalLine
                            key={`link-${i}`}
                            data={link}
                            depth={link.source.depth}
                          />
                        )
                      )}
                  </Group>
                  {/* node ---------------------------------- */}
                  <Group id="mindmapNodeGroup">
                    {tree.descendants().map((node, i) => {
                      nodeRef.current = node;

                      if (node.depth === 0) {
                        nodeRef.current.x = 30;
                        nodeRef.current.y = -30;
                      } else {
                        i % 2 === 0 && node.depth === 1
                          ? (nodeRef.current.y = node.y - 80)
                          : (nodeRef.current.y = node.y - 90);
                      }

                      return (
                        <MindmapNode
                          key={`node-${i}`}
                          node={node}
                          onClickAddButton={onClickAddButton}
                          onClickNode={onClickNode}
                        />
                      );
                    })}
                  </Group>
                </StyledMindmapTreeGroup>
              )}
            </StyledTree>
          </StyledMindmapSvg>
        )}
      </ParentSize>
    </MindmapWrapper>
  );
};

export default Mindmap;
