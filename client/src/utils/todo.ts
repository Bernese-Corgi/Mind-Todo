import { TodoListType } from './api/todos';

export const filterTodosByNode = (allTodos: TodoListType) => {
  /* non duplicate node id array ---------------------- */
  const nonDuplicateNodeId = new Set<string>();

  allTodos.map(todo => {
    todo.nodeId?._id && nonDuplicateNodeId.add(todo.nodeId?._id);
  });

  /* filtered todos array by node ---------------------- */
  let array: TodoListType[] = [];

  nonDuplicateNodeId.forEach(nodeId => {
    let todosWithMatchNode: TodoListType = [];

    allTodos.map(_todo => {
      if (nodeId === _todo.nodeId?._id) {
        todosWithMatchNode.push(_todo);
      }
    });

    array.push(todosWithMatchNode);
  });

  return array;
};
