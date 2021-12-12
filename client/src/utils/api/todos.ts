import client from './client';

const URI = '/api/todos';

export type TodoType = {
  _id?: string;
  content?: string;
  completed?: boolean;
};

export const listTodos = () => client.get(`${URI}`);

export const nodeListTodos = (nodeId: string) => client.get(`${URI}/${nodeId}`);

export const writeTodo = (nodeId: string, newTodo: TodoType) =>
  client.post(`${URI}/${nodeId}`, newTodo);

export const updateTodo = (todoId: string, updateTodo: TodoType) => {
  console.log(updateTodo);
  return client.patch(`${URI}/${todoId}`, updateTodo);
};

export const removeTodo = (todoId: string) => client.delete(`${URI}/${todoId}`);
