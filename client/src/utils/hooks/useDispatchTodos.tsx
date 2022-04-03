import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTodoAsync, updateTodoAsync } from 'redux/modules/todos/todo';
import { listTodosAsync } from 'redux/modules/todos/todos';

export type TodoDataHandlerType = {
  onToggle: (todoId: string, completed: boolean) => void;
  onEdit: (todoId: string, content: string) => void;
  onDelete: (todoId: string) => void;
};

/**
 * todo의 토글, 수정, 삭제를 위한 thunk 비동기 액션을 수행하는 함수들을 반환하는 커스텀 훅
 * @returns { handleToggle, handleEdit, handleDelete }
 */
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
