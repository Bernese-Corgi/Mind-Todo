import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTodoAsync, updateTodoAsync } from 'redux/modules/todos/todo';
import { listTodosAsync } from 'redux/modules/todos/todos';

const useDispatchTodos = () => {
  const dispatch = useDispatch();

  const handleToggle = async (todoId: string, completed: boolean) => {
    await dispatch(updateTodoAsync(todoId, { completed: !completed }));
    dispatch(listTodosAsync());
  };

  const handleEdit = async (todoId: string, content: string) => {
    await dispatch(updateTodoAsync(todoId, { content }));
    dispatch(listTodosAsync());
  };

  const handleDelete = async (todoId: string) => {
    await dispatch(removeTodoAsync(todoId));
    dispatch(listTodosAsync());
  };

  return { handleToggle, handleEdit, handleDelete };
};

export default useDispatchTodos;
