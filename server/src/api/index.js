import Router from 'koa-router';
import auth from './auth';
import posts from './posts';
import todos from './todos';
import mindmaps from './mindmaps';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/posts', posts.routes());
api.use('/todos', todos.routes());
api.use('/mindmaps', mindmaps.routes());

export default api;
