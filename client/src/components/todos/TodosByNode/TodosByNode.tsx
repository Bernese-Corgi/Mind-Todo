import React, { useEffect, useState } from 'react';
import { chunkDateString } from 'utils/stringUtils';
import { TodoList } from '..';
import { TodoDataHandlerType } from '../AllTodos/AllTodos';
import { StyledTodosByNodeArticle } from './TodosByNode.styled';
import { getNodeRoute, findMatchNodeByMindmapBody } from 'utils/mindmap';
import { MindmapType } from 'utils/api/mindmaps';
import { NodeRoute } from 'components/node';
import { Skeleton } from 'components/common';
import { TodoListType } from 'utils/api/todos';

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
  const createdDate =
    todoListByNode[0].createdAt && chunkDateString(todoListByNode[0].createdAt);

  const link = `/mindmap/${node?.mindmapId}/${node?._id}`;

  const [nodeRoute, setNodeRoute] = useState<string>('');

  useEffect(() => {
    if (mindmap && mindmap?.body && node) {
      const matchNode = findMatchNodeByMindmapBody(node, mindmap.body);

      if (matchNode) {
        const route = getNodeRoute(matchNode, mindmap.body, '>');

        setNodeRoute(route);
      }
    }
  }, [mindmap, node, node?._id]);

  if (nodeRoute === '' || !node)
    return (
      <StyledTodosByNodeArticle>
        <Skeleton types={['title', 'date', 'todos']} />
      </StyledTodosByNodeArticle>
    );

  return (
    <StyledTodosByNodeArticle>
      <NodeRoute content={nodeRoute} link={link} />
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
