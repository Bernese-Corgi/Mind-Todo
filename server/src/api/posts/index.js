import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import { getById } from '../../utils';
import { checkLoggedIn, checkOwn } from '../../utils/checkUser';
import { Post } from '../../model';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/:nodeId', checkLoggedIn, postsCtrl.write);

const post = new Router();

post.get('/', postsCtrl.read);
post.patch('/', checkLoggedIn, checkOwn(Post), postsCtrl.update);
post.delete('/', checkLoggedIn, checkOwn(Post), postsCtrl.remove);

posts.use('/:postId', getById(Post), post.routes());

export default posts;
