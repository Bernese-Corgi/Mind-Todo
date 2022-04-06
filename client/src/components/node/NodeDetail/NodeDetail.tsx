import {
  StyledNodeDetailClose,
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
import { checkIsRoot } from 'utils/mindmap';
import { MindmapType, NodeType } from 'utils/api/mindmaps';
import { PostType } from 'utils/api/posts';
import { TodoListType } from 'utils/api/todos';

interface NodeDetailProps {
  links: {
    mindmap: string;
  };
  nodeId: string;
  mindmap: MindmapType;
  node: NodeType;
  post: PostType;
  todos: TodoListType;
  loading: boolean;
  error;
  onEdit: {
    nodeName: (updateNodeName: string) => void;
    mindmapTitle: (updateMindmapTitle: string) => void;
  };
  onRemove: {
    nodeName: () => void;
    mindmapTitle: () => void;
  };
  onCloseNodePage: () => void;
}

const NodeDetail = ({
  nodeId,
  mindmap,
  node,
  post,
  todos,
  loading,
  error,
  onEdit,
  onRemove,
  onCloseNodePage,
}: NodeDetailProps) => {
  if (loading) return null;
  if (error) return <p>error 발생!</p>;

  return (
    <>
      {/* node detail ------------------------------ */}
      <StyledNodeDetailSection className="nodeDetailSection">
        {/* node route */}
        <StyledNodeRoute>
          {node?._id ? (
            <NodeRoute
              className="title"
              mindmap={mindmap}
              nodeIdToFind={node?._id}
            />
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

        <StyledNodeDetailClose
          id="closeNodePage"
          title="노드 페이지 닫기"
          onClick={onCloseNodePage}
        />
      </StyledNodeDetailSection>
    </>
  );
};

export default NodeDetail;
