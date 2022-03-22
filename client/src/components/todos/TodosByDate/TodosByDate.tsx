import React from 'react';
import { TodoListType } from 'utils/api/todos';
import { useDispatchTodos } from 'utils/hooks';
import { chunkDateString } from 'utils/stringUtils';
import { TodoList } from '..';
import { StyledTodosByDateArticle } from './TodosByDate.styled';

interface TodosByDateProps {
  todoListByDate: TodoListType;
}

const TodosByDate = ({ todoListByDate }: TodosByDateProps) => {
  const { handleToggle, handleEdit, handleDelete } = useDispatchTodos();
  const date =
    todoListByDate[0].createdAt && chunkDateString(todoListByDate[0].createdAt);

  return (
    <StyledTodosByDateArticle>
      <h3 className="title">{date}</h3>
      <TodoList
        todos={todoListByDate}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </StyledTodosByDateArticle>
  );
};

export default TodosByDate;
