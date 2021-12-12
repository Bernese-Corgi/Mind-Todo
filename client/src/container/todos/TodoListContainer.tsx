import React, { useLayoutEffect } from 'react';
import { LoadingIcon } from 'components/common';
import { TodoList } from 'components/todos';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { readNodeAsync } from 'redux/modules/mindmaps/node';
import { removeTodoAsync, updateTodoAsync } from 'redux/modules/todos/todo';

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

  const handleToggleTodo = (todoId: string, completed: boolean) => {
    dispatch(updateTodoAsync(todoId, { completed: !completed }));
  };

  const handleEditTodo = (todoId: string, content: string) => {
    dispatch(updateTodoAsync(todoId, { content }));
  };

  const handleDeleteTodo = (todoId: string) => {
    dispatch(removeTodoAsync(todoId));
  };

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
      onToggle={handleToggleTodo}
      onEdit={handleEditTodo}
      onDelete={handleDeleteTodo}
    />
  );
};

export default TodoListContainer;
