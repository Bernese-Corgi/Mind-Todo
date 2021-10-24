import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/list', postsCtrl.list);
posts.post('write', postsCtrl.write);

const post = new Router();

post.get('/', postsCtrl.read);
post.patch('/', postsCtrl.update);
post.delete('/', postsCtrl.remove);

posts.use(':id', post.routes());
