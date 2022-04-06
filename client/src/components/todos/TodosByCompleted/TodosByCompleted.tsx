import React from 'react';
import { TodoListType } from 'utils/api/todos';
import { TodoDataHandlerType } from 'utils/hooks/useDispatchTodos';
import { TodoItem } from '..';
import { TodosByCompletedWrapper } from './TodosByCompleted.styled';

interface TodosByUncompletedProps {
  todoListByCompleted: TodoListType[];
  todoDataHandler: TodoDataHandlerType;
}

const TodosByUncompleted = ({
  todoListByCompleted,
  todoDataHandler,
}: TodosByUncompletedProps) => {
  const { onToggle, onEdit, onDelete } = todoDataHandler;

  return (
    <TodosByCompletedWrapper>
      {todoListByCompleted.map(todos =>
        todos[0]?.completed ? (
          <div className="completed">
            <p>완료된 할 일</p>
            <ul>
              {todos.map(todo => (
                <TodoItem
                  todo={todo}
                  onToggle={onToggle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div className="uncompleted">
            <p>완료되지 않은 할 일</p>
            <ul>
              {todos.map(todo => (
                <TodoItem
                  todo={todo}
                  onToggle={onToggle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </ul>
          </div>
        )
      )}
    </TodosByCompletedWrapper>
  );
};

export default TodosByUncompleted;
