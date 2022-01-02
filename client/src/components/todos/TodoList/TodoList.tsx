import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { TodoType } from 'utils/api/todos';
import { isEmptyArray } from 'utils/arrayUtils';
import { TodoItem } from '..';

const StyledTodoListUl = styled.ul`
  width: 100%;

  .emptyTodo {
    color: ${theme.colors.gray.dark}99;
    margin: 1em;
  }

  .uncompleted,
  .completed {
    text-align: left;
    color: ${theme.colors.gray.dark}99;
    margin: 0.5em;
  }
`;

interface TodoListProps {
  todos: TodoType[];
  onToggle: (todoId: string, completed: boolean) => void;
  onEdit: (todoId: string, content: string) => void;
  onDelete: (todoId: string) => void;
}

const TodoList = ({ todos, onToggle, onEdit, onDelete }: TodoListProps) => {
  if (isEmptyArray(todos))
    return (
      <StyledTodoListUl>
        <p className="emptyTodo">작성된 todo가 없습니다.</p>
      </StyledTodoListUl>
    );

  return (
    <StyledTodoListUl className="todoListUl">
      <div className="uncompletedList">
        <p className="uncompleted">완료되지 않은 항목</p>
        {todos?.map(todo => {
          if (!todo.completed)
            return (
              <TodoItem
                todo={todo}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
        })}
      </div>

      <div className="completedList">
        <p className="completed">완료된 항목</p>
        {todos?.map(todo => {
          if (todo.completed)
            return (
              <TodoItem
                todo={todo}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
        })}
      </div>
    </StyledTodoListUl>
  );
};

export default TodoList;
