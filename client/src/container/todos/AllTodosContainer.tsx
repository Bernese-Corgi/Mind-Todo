import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { AllTodos } from 'components/todos';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/modules';
import { removeTodoAsync, updateTodoAsync } from 'redux/modules/todos/todo';
import { listTodosAsync } from 'redux/modules/todos/todos';

const AllTodosContainer = () => {
  const dispatch = useDispatch();

  const { todoList, loading, error } = useSelector(({ todos }: RootState) => ({
    todoList: todos.todos,
    loading: todos.loading,
    error: todos.error,
  }));

  const handleToggle = async (todoId: string, completed: boolean) => {
    await dispatch(updateTodoAsync(todoId, { completed: !completed }));
    dispatch(listTodosAsync());
  };

  const handleEdit = async (todoId: string, content: string) => {
    await dispatch(updateTodoAsync(todoId, { content }));
    dispatch(listTodosAsync());
  };

  const handleDelete = async (todoId: string) => {
    await dispatch(removeTodoAsync(todoId));
    dispatch(listTodosAsync());
  };

  useEffect(() => {
    dispatch(listTodosAsync());
  }, [dispatch]);

  return (
    <AllTodos
      todoList={todoList}
      onToggle={handleToggle}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loading={loading}
      error={error}
    />
  );
};

export default AllTodosContainer;

// const [todosByNode, setTodosByNode] = useState<any[]>([]);

// const isSameDay = (target1: Date, target2: Date) => {
//   console.log(target1.getFullYear(), target2);
//   if (
//     target1.getFullYear() === target2.getFullYear() &&
//     target1.getMonth() === target2.getMonth() &&
//     target1.getDay() === target2.getDay()
//   ) {
//     console.log(target1, target2);
//   }
// };
// useEffect(() => {
//   if (todoList) {
// let arr2: any[] = [];
// let arr: any[] = [];
// const asdf = todoList.map((todo, i, todos) => {
//   const todoDate = new Date(todo.createdAt);
//   const qwer = todos.filter(_todo => {
//     const todoDate2 = new Date(_todo.createdAt);
//     // if (_todo._id === todo._id) return;
//     if (
//       todoDate.getFullYear() === todoDate2.getFullYear() &&
//       todoDate.getMonth() === todoDate2.getMonth() &&
//       todoDate.getDay() === todoDate2.getDay()
//     ) {
//       // console.log(_todo.content, todo.content);
//       return _todo;
//     }
//     // return null;/
//   });
//   arr.push(qwer);
//   // return qwer;
//   // isSameDay(new Date(todo.cretaedAt), new Date(todos[i].createdAt));
// });
// const aj = arr.map((v, i, a) => {
//   // if (!v) return;
//   if (i === 0) {
//     return arr.slice(0, v.length);
//   } else {
//     return arr.slice(v.length, v.length * 2);
//   }
//   // return arr;
// });
// console.log(aj);
// let arr: any[] = [];
// const result = todoList.map((todo, i, todos) => {
//   if (todos[i].nodeId !== todo.nodeId) return;
//   // if (todos[i].nodeId === todo.nodeId) {
//   console.log(todos[i].nodeId, todos[i].content, todo.content);
// arr.push(todo);
// }
// let arr: any[] = [];
// todos.map(_todo => {
//   if (todo.nodeId === _todo.nodeId) {
//     arr.push(todos);
//   }
// });
// console.log(arr);
// console.log(
//   todo.content,
//   filtered,
//   todos[filtered].content,
//   todo.nodeId === todos[filtered].nodeId,
//   todo.nodeId
// );
// if (todo.nodeId === todos[filtered].nodeId) {
//   const array = new Array();
//   array.push(todos[filtered]);
//   arr.push(array);
// }
// arr.push(todos[filtered]);
// });
// console.log(arr);
// console.log(result);
// console.log(result);
// const qwer = todoList.filter((todo, _, allTodos) => {
// const filtered = allTodos.filter(_todo => todo.nodeId === _todo.nodeId);
// console.log(filtered);
// return filtered;
// allTodos.filter(_todo => {
//   return todo.nodeId === _todo.nodeId;
// })
// });
// const sqwer = todoList.sort((a, b) => {
// if (a.nodeId === b.nodeId) return a.nodeId;
// });
// console.log(qwer);
// setTodosByNode([...todosByNode, filtered]);
// clg;
// const filtered = todoList.filter(todo => todo.nodeId);
// const filtered = todoList.sort((a, b, c, d) => {
//   // console.log(a, b);
//   if (a.nodeId === b.nodeId) {
//     let array1: any[] = [];
//     let array2: any[] = [];
//     array1.push(a);
//     array2.push(array1);
//     console.log(array2);
//   }
//   // return array;
// });
// console.log(filtered);
// setTodosByNode(qwer);
// console.log(todosByNode);
// }
// }, [todoList]);
