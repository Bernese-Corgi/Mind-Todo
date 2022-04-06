import React from 'react';
import { Responsive } from 'components/common';
import { AllTodosContainer } from 'container/todos';

const TodoListPage = () => {
  return (
    <main>
      <Responsive>
        <AllTodosContainer />
      </Responsive>
    </main>
  );
};

export default TodoListPage;
