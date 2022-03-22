import { useEffect, useState } from 'react';
import { AllTodosWrapper } from './AllTodos.styled';
import { TodoListType } from 'utils/api/todos';
import { TodosByNodeContainer } from 'container/todos';
import {
  filterTodosByCompleted,
  filterTodosByDate,
  filterTodosByNode,
} from 'utils/todo';
import { TodosByDate, TodosByCompleted } from '..';
import { MenuTab } from 'components/common';
import { TodoDataHandlerType } from 'utils/hooks/useDispatchTodos';

export type FilterModeType = 'node' | 'date' | 'completed';

export type AllTodosProps = {
  onReadList;
  todoDataHandler: TodoDataHandlerType;
  todoList: TodoListType;
  loading;
  error;
};

const AllTodos = ({
  onReadList,
  todoDataHandler,
  todoList,
  loading,
  error,
}: AllTodosProps) => {
  const [allTodos, setAllTodos] = useState<TodoListType[]>([]);
  const [filterMode, setFilterMode] = useState<FilterModeType>('node');

  const menus = [
    {
      name: '노드 별 목록',
      active: filterMode === 'node',
      onClick: () => setFilterMode('node'),
    },
    {
      name: '날짜 별 목록',
      active: filterMode === 'date',
      onClick: () => setFilterMode('date'),
    },
    {
      name: '완료되지 않은 항목 모아보기',
      active: filterMode === 'completed',
      onClick: () => setFilterMode('completed'),
    },
  ];

  // filterMode에 따라 allTodos 데이터 변경
  useEffect(() => {
    if (!todoList) return;

    switch (filterMode) {
      case 'node':
        setAllTodos(filterTodosByNode(todoList));
        break;
      case 'date':
        setAllTodos(filterTodosByDate(todoList));
        break;
      case 'completed':
        setAllTodos(filterTodosByCompleted(todoList));
        break;
    }
  }, [filterMode, todoList]);

  // filterMode가 변경될 때마다 list todo 디스패치
  useEffect(() => {
    onReadList();
  }, [filterMode]);

  console.log(allTodos);

  if (error) return <p>error</p>;

  return (
    <AllTodosWrapper>
      <h2 className="allTodosTitle">Todo List</h2>
      <MenuTab menus={menus} />
      {filterMode === 'node' &&
        allTodos.map(todoListByNode => {
          return (
            <TodosByNodeContainer
              node={todoListByNode[0].nodeId}
              todoListByNode={todoListByNode}
            />
          );
        })}
      {filterMode === 'date' &&
        allTodos.map(todoListByDate => {
          return <TodosByDate todoListByDate={todoListByDate} />;
        })}
      {filterMode === 'completed' && (
        <TodosByCompleted
          todoListByCompleted={allTodos}
          todoDataHandler={todoDataHandler}
        />
      )}
    </AllTodosWrapper>
  );
};

export default AllTodos;
