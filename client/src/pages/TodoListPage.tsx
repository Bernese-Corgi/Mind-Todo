import React from 'react';
import { TodoUnit } from 'components/todos';
import { Responsive } from 'components/common';

const TodoListPage = () => {
  return (
    <Responsive>
      <TodoUnit />
    </Responsive>
  );
};

export default TodoListPage;
