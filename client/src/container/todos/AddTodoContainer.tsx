import React from 'react';
import { AddTodo } from 'components/todos';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { writeTodoAsync } from 'redux/modules/todos/todo';
import { nodeListTodosAsync } from 'redux/modules/todos/todos';

const AddTodoContainer = ({ nodeId }) => {
  const dispatch = useDispatch();
  // const { todo } = useSelector(({ todo }: RootState) => ({
  //   todo: todo?.data,
  //   loading: todo?.loading,
  //   error: todo?.error,
  // }));

  const handleAddTodo = async (content: string) => {
    const newTodo = await dispatch(writeTodoAsync(nodeId, { content }));
    if (!!newTodo) {
      dispatch(nodeListTodosAsync(nodeId)); // FIXME 제대로 동작 안함
    }
  };

  if (!nodeId) return <p>node id가 없습니다.</p>;

  return <AddTodo onAddTodo={handleAddTodo} />;
};

export default AddTodoContainer;
