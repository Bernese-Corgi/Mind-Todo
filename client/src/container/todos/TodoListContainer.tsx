import React, { useLayoutEffect } from 'react';
import { LoadingIcon } from 'components/common';
import { TodoList } from 'components/todos';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { readNodeAsync } from 'redux/modules/mindmaps/node';
import { removeTodoAsync, updateTodoAsync } from 'redux/modules/todos/todo';
import { useDispatchTodos } from 'utils/hooks';

interface TodoListContainerProps {
  todos?: any;
  mindmapId: string;
  nodeId: string;
}

const TodoListContainer = ({ mindmapId, nodeId }: TodoListContainerProps) => {
  const dispatch = useDispatch();
  const { todos, todosLoading, todosError, nodeTodos } = useSelector(
    ({ todos, todo, node }: RootState) => {
      return {
        nodeTodos: node.todos,
        todos: todos.todos,
        todosLoading: todos.loading,
        todosError: todos.error,
        todoData: todo.todo,
      };
    }
  );

  const { handleToggle, handleEdit, handleDelete } = useDispatchTodos();

  useLayoutEffect(() => {
    if (!nodeTodos) {
      // FIXME 동작 불확실
      dispatch(readNodeAsync(mindmapId, nodeId));
    }
  }, [dispatch, mindmapId, nodeId, nodeTodos]);

  if (todosLoading) return <LoadingIcon />;
  // if (!todos) return <p>데이터 없음</p>;

  return (
    <TodoList
      todos={nodeTodos ? nodeTodos : todos}
      onToggle={handleToggle}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default TodoListContainer;
