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
}: NodeDetailProps) => {
  const isRoot = false;
  const mindmapId = mindmap?._id;
  // const nodeId = node?._id;
  // const nodePost = node?.post;
  // const nodeTodos = node?.todos;

  console.log(node);
  // if (!node) return <p>aa</p>;
  if (loading) return <LoadingIcon />;
  if (error) return <p>error 발생!</p>;

  return (
    <>
      {/* node detail ------------------------------ */}
      <StyledNodeDetailSection>
        {/* node name */}
        <StyledNodeName>
          <NodeName nodeName={node?.name} isRoot={isRoot} />
        </StyledNodeName>

        {/* todos */}
        <StyledNodeTodoSection>
          <h3>todos</h3>
          <TodoUnit todos={todos} hasColumn />
        </StyledNodeTodoSection>

        {/* post */}
        <StyledNodePostSection>
          <h3>post</h3>
          <PostViewerContainer
            nodePost={post}
            nodeId={nodeId}
            mindmapId={mindmapId}
          />
        </StyledNodePostSection>
      </StyledNodeDetailSection>
    </>
  );
};

export default NodeDetail;
