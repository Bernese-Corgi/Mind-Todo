import Router from 'koa-router';
import { Todo } from '../../model';
import { getById } from '../../utils';
import { checkLoggedIn, checkOwn } from '../../utils/checkUser';
import * as todosCtrl from './todos.ctrl';

const todos = new Router();

todos.get('/', checkLoggedIn, todosCtrl.list);
todos.post('/:nodeId', checkLoggedIn, todosCtrl.write);
todos.get('/:nodeId', checkLoggedIn, todosCtrl.nodeList);

const todo = new Router();
todo.patch('/', checkLoggedIn, checkOwn(Todo), todosCtrl.update);
todo.delete('/', checkLoggedIn, checkOwn(Todo), todosCtrl.remove);

todos.use('/:todoId', getById(Todo), todo.routes());

export default todos;
