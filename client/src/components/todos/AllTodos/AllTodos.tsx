import { LoadingIcon } from 'components/common';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { listTodosAsync } from 'redux/modules/todos/todos';
import { TodoList } from '..';
import { AllTodosWrapper } from './AllTodos.styled';

interface AllTodosProps {}

const AllTodos = ({}: AllTodosProps) => {
  const dispatch = useDispatch();

  const { todoList, loading, error } = useSelector(({ todos }: RootState) => ({
    todoList: todos.todos,
    loading: todos.loading,
    error: todos.error,
  }));

  useEffect(() => {
    dispatch(listTodosAsync());
  }, [dispatch]);

  if (loading) return <LoadingIcon />;
  if (todoList) return <p>no data</p>;
  if (error) return <p>error</p>;

  return (
    <AllTodosWrapper>
      <h2 className="allTodosTitle">Todo List</h2>
      <TodoList todos={todoList} />
    </AllTodosWrapper>
  );
};

export default AllTodos;
