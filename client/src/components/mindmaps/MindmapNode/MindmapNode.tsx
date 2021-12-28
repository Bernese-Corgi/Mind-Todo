import React, { MouseEventHandler, useEffect, useState } from 'react';
import {
  StyledNodeGroup,
  StyledTextGroup,
  StyledNodeText,
  StyledNodeTextBox,
  StyledAddGroup,
  StyledAddUseIcon,
  StyledAddWrapRect,
} from './MindmapNode.styled';
import { getD3NodeSelectionById, getNodeBBox, wrapText } from 'utils/mindmap';
import { HierarchyNode } from '@visx/hierarchy/lib/types';

interface MindmapNodeProps {
  node: HierarchyNode<any>;
  onClickAddButton: (
    e: MouseEventHandler<SVGGElement>,
    parentId: string
  ) => void;
  onClickNode: (e: MouseEventHandler<SVGGElement>, nodeId: string) => void;
}

const MindmapNode = ({
  node,
  onClickAddButton,
  onClickNode,
}: MindmapNodeProps) => {
  const nodeId = node.data.node._id;
  const nodeName = node.data.node.name;
  const treeId = node.data._id;

  const textLen = 12;

  const [textsize, setTextsize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const nodeTextSelection = getD3NodeSelectionById('.nodeText', treeId);

    wrapText(nodeTextSelection, nodeName, textLen, { x: '0.5em' });
  }, [treeId, nodeName]);

  useEffect(() => {
    const nodeTextSelection = getD3NodeSelectionById('.nodeText', treeId);

    const nodeTextBBox = getNodeBBox(nodeTextSelection);

    setTextsize({
      width: nodeTextBBox.width,
      height: nodeTextBBox.height,
    });
  }, [treeId]);

  if (!node) return <p>node 없음</p>;

  return (
    <StyledNodeGroup node={node} textsize={textsize} key={treeId}>
      <StyledTextGroup onClick={e => onClickNode(e, nodeId)}>
        <StyledNodeTextBox node={node} textsize={textsize} />
        <StyledNodeText children={nodeName} id={treeId} />
      </StyledTextGroup>

      <StyledAddGroup
        node={node}
        textsize={textsize}
        onClick={e => onClickAddButton(e, nodeId)}>
        <StyledAddUseIcon shape="plus" node={node} />
        <StyledAddWrapRect />
      </StyledAddGroup>
    </StyledNodeGroup>
  );
};

export default MindmapNode;
