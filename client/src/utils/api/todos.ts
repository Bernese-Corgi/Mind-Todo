import client from './client';
import { UserType } from './auth';

const URI = '/api/todos';

export type TodoType = {
  publisher?: UserType;
  // TODO 중복되니까 하나로 합치기
  nodeId?: {
    name: string;
    _id?: string;
  };
  _id?: string;
  content?: string;
  completed?: boolean;
};

export type TodoListType = TodoType[];

export const listTodos = () => client.get(`${URI}`);

export const nodeListTodos = (nodeId: string) => client.get(`${URI}/${nodeId}`);

export const writeTodo = (nodeId: string, newTodo: TodoType) =>
  client.post(`${URI}/${nodeId}`, newTodo);

export const updateTodo = (todoId: string, updateTodo: TodoType) => {
  console.log(updateTodo);
  return client.patch(`${URI}/${todoId}`, updateTodo);
};

export const removeTodo = (todoId: string) => client.delete(`${URI}/${todoId}`);
