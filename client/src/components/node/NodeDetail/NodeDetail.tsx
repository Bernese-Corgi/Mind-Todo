import React from 'react';
import {
  StyledNodeDetailSection,
  StyledNodeName,
  StyledNodePostSection,
  StyledNodeTodoSection,
} from './NodeDetail.styled';
import { NodeName } from '..';
import { TodoUnit } from 'components/todos';
import { PostViewerContainer } from 'container/posts';
import { LoadingIcon } from 'components/common';
import { checkIsRoot } from 'utils/mindmap';

interface NodeDetailProps {
  links: {
    mindmap: string;
  };
  nodeId: string;
  mindmap: any;
  node;
  post: any;
  todos: any;
  loading;
  error;
  onEdit: {
    nodeName: (updateNodeName: string) => void;
  };
  onRemove: {
    nodeName: () => void;
  };
}

const NodeDetail = ({
  links,
  nodeId,
  mindmap,
  node,
  post,
  todos,
  loading,
  error,
  onEdit,
  onRemove,
}: NodeDetailProps) => {
  // if (!node) return <p>aa</p>;
  if (loading) return <LoadingIcon />;
  if (error) return <p>error 발생!</p>;

  return (
    <>
      {/* node detail ------------------------------ */}
      <StyledNodeDetailSection>
        {/* node name */}
        <StyledNodeName>
          <NodeName
            nodeName={node?.name}
            isRoot={checkIsRoot(mindmap, nodeId)}
            onEdit={onEdit.nodeName}
            onRemove={onRemove.nodeName}
          />
        </StyledNodeName>

        {/* todos */}
        <StyledNodeTodoSection>
          <h3>todos</h3>
          <TodoUnit todos={todos} hasColumn />
        </StyledNodeTodoSection>

        {/* post */}
        <StyledNodePostSection>
          <h3>post</h3>
          <PostViewerContainer nodePost={post} />
        </StyledNodePostSection>
      </StyledNodeDetailSection>
    </>
  );
};

export default NodeDetail;
