import Router from 'koa-router';
import * as todosCtrl from './todos.ctrl';

const todos = new Router();

todos.get('/', todosCtrl.list);
todos.post('/', todosCtrl.write);
todos.patch('/:id', todosCtrl.update);
todos.delete('/:id', todosCtrl.remove);

export default todos;
