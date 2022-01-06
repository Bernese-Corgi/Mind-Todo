import React, { useEffect, useState } from 'react';
import {
  StyledNodeDetailSection,
  StyledNodeName,
  StyledNodePostSection,
  StyledNodeRoute,
  StyledNodeTodoSection,
} from './NodeDetail.styled';
import { NodeName, NodeRoute } from '..';
import { TodoUnit } from 'components/todos';
import { PostViewerContainer } from 'container/posts';
import { Skeleton } from 'components/common';
import {
  checkIsRoot,
  findMatchNodeByMindmapBody,
  getNodeRoute,
} from 'utils/mindmap';

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
    mindmapTitle: (updateMindmapTitle: string) => void;
  };
  onRemove: {
    nodeName: () => void;
    mindmapTitle: () => void;
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
  const [nodeRoute, setNodeRoute] = useState<string>();

  useEffect(() => {
    if (mindmap && mindmap.body && node) {
      const matchNode = findMatchNodeByMindmapBody(node, mindmap.body);

      if (matchNode) {
        const route = getNodeRoute(matchNode, mindmap.body);
        setNodeRoute(route);
      }
    }
  }, [mindmap, mindmap?.body, node]);

  // if (!node) return <p>aa</p>;
  if (loading) return null;
  if (error) return <p>error 발생!</p>;

  return (
    <>
      {/* node detail ------------------------------ */}
      <StyledNodeDetailSection className="nodeDetailSection">
        {/* node route */}
        <StyledNodeRoute>
          {nodeRoute ? (
            <NodeRoute content={nodeRoute} className="title" />
          ) : (
            <Skeleton types={['title']} />
          )}
        </StyledNodeRoute>

        {/* node name */}
        <StyledNodeName>
          <NodeName
            nodeName={node?.name}
            isRoot={checkIsRoot(mindmap, nodeId)}
            onEdit={onEdit}
            onRemove={onRemove}
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
