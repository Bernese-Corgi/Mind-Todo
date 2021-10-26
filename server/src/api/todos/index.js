import Router from 'koa-router';
import { Todo } from '../../model';
import { getById } from '../../utils';
import { checkLoggedIn, checkOwn } from '../../utils/checkUser';
import * as todosCtrl from './todos.ctrl';

const todos = new Router();

todos.get('/', checkLoggedIn, todosCtrl.list);
todos.post('/', checkLoggedIn, todosCtrl.write);

const todo = new Router();
todo.patch('/', checkLoggedIn, checkOwn(Todo), todosCtrl.update);
todo.delete('/', checkLoggedIn, checkOwn(Todo), todosCtrl.remove);

todos.use('/:id', getById(Todo), todo.routes());

export default todos;
