import { useEffect } from 'react';
import { AllTodos } from 'components/todos';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { listTodosAsync } from 'redux/modules/todos/todos';
import { useDispatchTodos } from 'utils/hooks';
import { useReduxDispatch } from 'redux/store';
import { TodoDataHandlerType } from 'utils/hooks/useDispatchTodos';

const AllTodosContainer = () => {
  const dispatch = useReduxDispatch();

  const { todoList, loading, error } = useSelector(({ todos }: RootState) => ({
    todoList: todos.todos,
    loading: todos.loading,
    error: todos.error,
  }));

  const { handleToggle, handleEdit, handleDelete } = useDispatchTodos();
  const todoDataHandler: TodoDataHandlerType = {
    onToggle: handleToggle,
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  useEffect(() => {
    dispatch(listTodosAsync());
  }, [dispatch]);

  const handleReadList = async () => {
    await dispatch(listTodosAsync());
  };

  return (
    <AllTodos
      todoDataHandler={todoDataHandler}
      onReadList={handleReadList}
      todoList={todoList}
      loading={loading}
      error={error}
    />
  );
};

export default AllTodosContainer;
