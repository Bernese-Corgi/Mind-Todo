import { useEffect, useState } from 'react';
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

const MindmapNode = ({ node, onClickAddButton, onClickNode }) => {
  const { nodeId } = node.data.node;

  const textLen = 12;

  const [textsize, setTextsize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const nodeTextSelection = getD3NodeSelectionById(
      '.nodeText',
      node.data._id
    );

    wrapText(nodeTextSelection, node.data.node.name, textLen, { x: '0.5em' });
  }, [node.data._id, node.data.node.name]);

  useEffect(() => {
    const nodeTextSelection = getD3NodeSelectionById(
      '.nodeText',
      node.data._id
    );

    const nodeTextBBox = getNodeBBox(nodeTextSelection);

    setTextsize({
      width: nodeTextBBox.width,
      height: nodeTextBBox.height,
    });
  }, [node.data._id]);

  return (
    <StyledNodeGroup node={node} textsize={textsize} key={node.data._id}>
      <StyledTextGroup onClick={e => onClickNode(e, nodeId)}>
        <StyledNodeTextBox node={node} textsize={textsize} />
        <StyledNodeText children={node.data.node.name} id={node.data._id} />
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
