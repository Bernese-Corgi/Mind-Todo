import { useEffect, useState } from 'react';
import { AllTodosWrapper } from './AllTodos.styled';
import { TodoListType } from 'utils/api/todos';
import { TodosByNodeContainer } from 'container/todos';

export type AllTodosProps = TodoDataHandlerType & {
  todoList: TodoListType;
  loading;
  error;
};

export type TodoDataHandlerType = {
  onToggle: (todoId: string, completed: boolean) => void;
  onEdit: (todoId: string, content: string) => void;
  onDelete: (todoId: string) => void;
};

const AllTodos = ({
  todoList,
  onToggle,
  onEdit,
  onDelete,
  loading,
  error,
}: AllTodosProps) => {
  const [allTodos, setAllTodos] = useState<TodoListType[]>([]);

  const filterTodoListByNode = (allTodoArray: TodoListType) => {
    const extractIndividualNodeId = allTodoArray.filter((todo, i, todos) => {
      if (!todo) return;

      return todo?.nodeId!._id !== todos[i + 1]?.nodeId!._id;
    });

    let arrayOfTodoListSortedByNode: TodoListType[] = [];

    extractIndividualNodeId.map(todo => {
      let todosWithMatchNode: TodoListType = [];

      // eslint-disable-next-line array-callback-return
      allTodoArray.map(_todo => {
        if (todo!.nodeId!._id === _todo!.nodeId!._id) {
          todosWithMatchNode.push(_todo);
        }
      });

      arrayOfTodoListSortedByNode.push(todosWithMatchNode);
    });

    return arrayOfTodoListSortedByNode;
  };

  useEffect(() => {
    if (!todoList) return;

    const filtered = filterTodoListByNode(todoList);

    setAllTodos(filtered);
  }, [todoList]);

  // if (todoList) return <p>no data</p>;
  // if (loading) return ;

  if (error) return <p>error</p>;

  return (
    <AllTodosWrapper>
      <h2 className="allTodosTitle">Todo List</h2>
      {allTodos.map(todoListByNode => {
        return (
          <TodosByNodeContainer
            node={todoListByNode[0].nodeId}
            todoListByNode={todoListByNode}
          />
        );
      })}
    </AllTodosWrapper>
  );
};

export default AllTodos;
