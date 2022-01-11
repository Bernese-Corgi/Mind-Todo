import React from 'react';
import { AddTodoContainer, TodoListContainer } from 'container/todos';
import { TodoUnitWrapper } from './TodoUnit.styled';
import { RouteComponentProps, withRouter } from 'react-router';
import { TodoListType } from 'utils/api/todos';

interface TodoUnitRouteParams {
  mindmapId: string;
  nodeId: string;
}

interface TodoUnitProps {
  todos?: TodoListType;
  hasColumn?: boolean;
}

const TodoUnit = ({
  todos,
  hasColumn,
  match,
}: TodoUnitProps & RouteComponentProps<TodoUnitRouteParams>) => {
  const { mindmapId, nodeId } = match.params;
  return (
    <TodoUnitWrapper hasColumn={hasColumn}>
      <AddTodoContainer nodeId={nodeId} />
      <TodoListContainer mindmapId={mindmapId} nodeId={nodeId} todos={todos} />
    </TodoUnitWrapper>
  );
};

export default withRouter(TodoUnit);
