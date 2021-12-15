import { LoadingIcon } from 'components/common';
import { useState } from 'react';
import { TodoList } from '..';
import { AllTodosWrapper } from './AllTodos.styled';

interface AllTodosProps {
  todoList;
  onToggle: (todoId: string, completed: boolean) => void;
  onEdit: (todoId: string, content: string) => void;
  onDelete: (todoId: string) => void;
  loading;
  error;
}

const AllTodos = ({
  todoList,
  onToggle,
  onEdit,
  onDelete,
  loading,
  error,
}: AllTodosProps) => {
  // if (loading) return <LoadingIcon />;
  // if (todoList) return <p>no data</p>;
  if (error) return <p>error</p>;

  return (
    <AllTodosWrapper>
      <h2 className="allTodosTitle">Todo List</h2>
      <TodoList
        todos={todoList}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      {/* {todoList?.map(todo => {
        return (
          <ul>
            <time>{chunkDateString(todo.createdAt)}</time>
            <TodoItem todo={todo} />
          </ul>
        );
      })} */}
    </AllTodosWrapper>
  );
};

export default AllTodos;
