import { Group } from '@visx/group';
import { Tree } from '@visx/hierarchy';
import { LinkHorizontal } from '@visx/shape';
import theme from 'styles/theme';
import { Mindmap } from 'utils/api/mindmaps';
import { setRainbowColor, StyledNode } from '../TreeNode/TreeNode.styled';

interface MindmapTreeProps {
  width?: any;
  height?: any;
  mindmap: Mindmap;
  onClickAddButton?: any;
  onClickNode?: any;
  treeData;
  rootNode?: any;
}

const MindmapTree = ({
  width,
  height,
  mindmap,
  onClickAddButton,
  onClickNode,
  treeData,
  rootNode,
}: MindmapTreeProps) => {
  const margin = { top: 10, left: 80, right: 80, bottom: 10 };

  const bgColor = `${theme.colors.primary.light}40`;

  return (
    <>
      <h2 className="a11yHidden">{mindmap?.title}</h2>
      <svg width={width} height={height} fill={theme.colors.gray.dark}>
        {/* 배경 사각형 */}
        <rect width={width} height={height} fill={bgColor} />
        {/* 
        {/* Tree */}
        <Tree
          root={treeData}
          size={[
            height - margin.top - margin.bottom,
            width - margin.left - margin.right,
          ]}
          top={0}
          left={0}
          // nodeSize={[100, 200]}
          // separation={(a, b) => (a.parent === b.parent ? 1 : 2) / a.depth}
          separation={(a, b) => {
            // console.log(a, b);
            return (a.y === b.y ? 1.5 : 1) / b.depth;
          }}
          //
        >
          {tree => (
            <>
              <Group top={margin.top} left={margin.left}>
                {/* link line */}
                <Group>
                  {tree.links().map((link, i) => (
                    <LinkHorizontal
                      key={`link-${i}`}
                      data={link}
                      stroke={setRainbowColor(link.source.depth)}
                      strokeWidth="1"
                      fill="none"
                    />
                  ))}
                </Group>

                <Group>
                  {/* node */}
                  {tree.descendants().map((node, i) => (
                    <StyledNode
                      key={`node-${i}`}
                      node={node}
                      onClickAddButton={onClickAddButton}
                      onClickNode={onClickNode}
                      styleObj={{ bgColor }}
                    />
                  ))}
                </Group>
              </Group>
            </>
          )}
        </Tree>
      </svg>
    </>
  );
};

export default MindmapTree;
