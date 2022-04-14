import { TodoListType } from './api/todos';
import { chunkDateString } from './stringUtils';

export const filterTodosByNode = (allTodos: TodoListType) => {
  /* non duplicate node id array ---------------------- */
  const nonDuplicateNodeId = new Set<string>();

  // eslint-disable-next-line array-callback-return
  allTodos.map(todo => {
    todo.nodeId?._id && nonDuplicateNodeId.add(todo.nodeId?._id);
  });

  /* filtered todos array by node ---------------------- */
  let array: TodoListType[] = [];

  nonDuplicateNodeId.forEach(nodeId => {
    let todosWithMatchNode: TodoListType = [];

    // eslint-disable-next-line array-callback-return
    allTodos.map(_todo => {
      if (nodeId === _todo.nodeId?._id) {
        todosWithMatchNode.push(_todo);
      }
    });

    array.push(todosWithMatchNode);
  });

  return array;
};

export const filterTodosByDate = (allTodos: TodoListType) => {
  // 중복되지 않는 작성 날짜 배열 생성
  const nonDuplicateDate = new Set<string>();

  // eslint-disable-next-line array-callback-return
  allTodos.map(todo => {
    todo.createdAt && nonDuplicateDate.add(chunkDateString(todo.createdAt));
  });

  let filteredArray: TodoListType[] = [];

  nonDuplicateDate.forEach(date => {
    let todosWithMatchDate: TodoListType = [];

    // eslint-disable-next-line array-callback-return
    allTodos.map(_todo => {
      if (_todo.createdAt && date === chunkDateString(_todo.createdAt)) {
        todosWithMatchDate.push(_todo);
      }
    });

    filteredArray.push(todosWithMatchDate);
  });

  // 최근 날짜 순으로 정렬
  filteredArray.sort((a, b) => {
    if (!a[0].createdAt || !b[0].createdAt) return 0;

    return a[0].createdAt < b[0].createdAt ? 1 : -1;
  });

  return filteredArray;
};

export const filterTodosByCompleted = (allTodos: TodoListType) => {
  let filteredArray: TodoListType[] = [];

  let unCompletedArray: TodoListType = [];
  let completedArray: TodoListType = [];

  allTodos.map(todo => {
    if (todo.completed) {
      completedArray.push(todo);
    } else {
      unCompletedArray.push(todo);
    }
  });

  filteredArray.push(unCompletedArray, completedArray);

  return filteredArray;
};
