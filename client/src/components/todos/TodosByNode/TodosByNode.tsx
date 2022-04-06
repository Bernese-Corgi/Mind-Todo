import { MindmapType } from 'utils/api/mindmaps';
import { TodoListType } from 'utils/api/todos';
import { TodoDataHandlerType } from 'utils/hooks/useDispatchTodos';
import { Skeleton } from 'components/common';
import { NodeRoute } from 'components/node';
import { TodoList } from '..';
import { StyledTodosByNodeArticle } from './TodosByNode.styled';

type TodosByNodeProps = TodoDataHandlerType & {
  todoListByNode: TodoListType;
  mindmap: MindmapType;
};

const TodosByNode = ({
  todoListByNode,
  mindmap,
  onToggle,
  onEdit,
  onDelete,
}: TodosByNodeProps) => {
  const node = todoListByNode[0].nodeId;

  if (!node)
    return (
      <StyledTodosByNodeArticle>
        <Skeleton types={['title', 'date', 'todos']} />
      </StyledTodosByNodeArticle>
    );

  return (
    <StyledTodosByNodeArticle>
      {node?._id && (
        <NodeRoute mindmap={mindmap} nodeIdToFind={node?._id} hasLink />
      )}
      <TodoList
        todos={todoListByNode}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </StyledTodosByNodeArticle>
  );
};

export default TodosByNode;
