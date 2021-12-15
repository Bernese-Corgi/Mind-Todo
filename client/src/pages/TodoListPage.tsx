import React from 'react';
import { Responsive } from 'components/common';
import { AllTodosContainer } from 'container/todos';

const TodoListPage = () => {
  return (
    <Responsive>
      <AllTodosContainer />
    </Responsive>
  );
};

export default TodoListPage;
