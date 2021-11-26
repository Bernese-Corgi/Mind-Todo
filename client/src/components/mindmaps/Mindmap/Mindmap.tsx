import { MouseEventHandler } from 'react';
/* component ------------------------------- */
import {
  MindmapWrapper,
  StyledMindmapTreeGroup,
  StyledMindmapLine,
  StyledTree,
  StyledMindmapSvg,
} from './Mindmap.styled';
import { MindmapNode } from '..';
/* visx ---------------------------------- */
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';

interface MindmapProps {
  onClicks: {
    addBtn: (e: MouseEventHandler<SVGGElement>, parentId: string) => void;
    node: (e: MouseEventHandler<SVGGElement>, nodeId: string) => void;
  };
  mindmap;
  treeData;
  rootNode?: any;
  loading?: boolean;
  error?: any;
}

const Mindmap = ({
  mindmap,
  treeData,
  loading,
  error,
  onClicks,
}: MindmapProps) => {
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
                  {/* link line */}
                  <Group id="mindmapLineGroup">
                    {tree.links().map((link, i) => (
                      <StyledMindmapLine
                        key={`link-${i}`}
                        data={link}
                        depth={link.source.depth}
                      />
                    ))}
                  </Group>
                  {/* node */}
                  <Group id="mindmapNodeGroup">
                    {tree.descendants().map((node, i, nodeArr) => (
                      <MindmapNode
                        key={`node-${i}`}
                        node={node}
                        onClickAddButton={onClicks.addBtn}
                        onClickNode={onClicks.node}
                      />
                    ))}
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
