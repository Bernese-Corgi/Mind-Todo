import React from 'react';
import styled from 'styled-components';
import { TodoItem } from '..';

const StyledTodoListUl = styled.ul`
  padding: 1em;

  li {
    padding: 0.2em;
    margin-bottom: 1em;
  }
`;

interface TodoListProps {
  todos;
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <StyledTodoListUl>
      {todos.map((todo, index, todos) => (
        <li key={todo._id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </StyledTodoListUl>
  );
};

export default TodoList;
