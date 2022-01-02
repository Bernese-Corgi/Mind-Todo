import { useEffect, useState } from 'react';
import { chunkDateString } from 'utils/stringUtils';
import { LoadingIcon } from 'components/common';
import { TodoList } from '..';
import { AllTodosWrapper } from './AllTodos.styled';
import { NodeRouteContainer } from 'container/nodes';
import { TodoListType } from 'utils/api/todos';

interface AllTodosProps {
  todoList: TodoListType;
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
  // if (loading) return <LoadingIcon />;
  if (error) return <p>error</p>;

  return (
    <AllTodosWrapper>
      <h2 className="allTodosTitle">Todo List</h2>
      {allTodos.map(todoListByNode => {
        const node = todoListByNode[0].nodeId;
        const createdDate =
          todoListByNode[0].createdAt &&
          chunkDateString(todoListByNode[0].createdAt);

        return (
          <article>
            {node && <NodeRouteContainer node={node} />}
            <time>{createdDate}</time>
            <TodoList
              todos={todoListByNode}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </article>
        );
      })}
    </AllTodosWrapper>
  );
};

export default AllTodos;
