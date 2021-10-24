import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);

const post = new Router();

post.get('/', postsCtrl.read);
post.patch('/', postsCtrl.update);
post.delete('/', postsCtrl.remove);

posts.use(':id', post.routes());

export default posts;
