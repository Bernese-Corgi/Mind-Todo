import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { AllTodos } from 'components/todos';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { removeTodoAsync, updateTodoAsync } from 'redux/modules/todos/todo';
import { listTodosAsync } from 'redux/modules/todos/todos';
import { useDispatchTodos } from 'utils/hooks';

const AllTodosContainer = () => {
  const dispatch = useDispatch();

  const { todoList, loading, error } = useSelector(({ todos }: RootState) => ({
    todoList: todos.todos,
    loading: todos.loading,
    error: todos.error,
  }));

  const { handleToggle, handleEdit, handleDelete } = useDispatchTodos();

  useEffect(() => {
    dispatch(listTodosAsync());
  }, [dispatch]);

  return (
    <AllTodos
      todoList={todoList}
      onToggle={handleToggle}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loading={loading}
      error={error}
    />
  );
};

export default AllTodosContainer;
