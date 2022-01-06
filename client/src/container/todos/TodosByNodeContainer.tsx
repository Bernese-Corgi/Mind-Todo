import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { readMindmapAsync } from 'redux/modules/mindmaps/mindmap';
import { NodeType } from 'utils/api/mindmaps';
import { useDispatchTodos } from 'utils/hooks';
import { TodosByNode } from 'components/todos';
import { TodoListType } from 'utils/api/todos';

interface TodosByNodeContainerProps {
  node?: Partial<NodeType>;
  todoListByNode: TodoListType;
}

const TodosByNodeContainer = ({
  node,
  todoListByNode,
}: TodosByNodeContainerProps) => {
  const dispatch = useDispatch();

  const { mindmapData, loading, error } = useSelector(
    ({ mindmap }: RootState) => ({
      mindmapData: mindmap.mindmap,
      loading: mindmap.loading,
      error: mindmap.error,
    })
  );

  const { handleToggle, handleEdit, handleDelete } = useDispatchTodos();

  useEffect(() => {
    node?.mindmapId && dispatch(readMindmapAsync(node?.mindmapId));
  }, [dispatch, node?._id, node?.mindmapId]);

  return (
    <TodosByNode
      todoListByNode={todoListByNode}
      mindmap={mindmapData}
      onToggle={handleToggle}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default TodosByNodeContainer;
