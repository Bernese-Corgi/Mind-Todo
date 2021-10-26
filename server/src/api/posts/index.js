import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import { getById } from '../../utils';
import * as checkUser from '../../utils/checkUser';
import { Post } from '../../model';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkUser.checkLoggedIn, postsCtrl.write);

const post = new Router();

post.get('/', postsCtrl.read);
post.patch(
  '/',
  checkUser.checkLoggedIn,
  checkUser.checkOwnPost(Post),
  postsCtrl.update,
);
post.delete(
  '/',
  checkUser.checkLoggedIn,
  checkUser.checkOwnPost(Post),
  postsCtrl.remove,
);

posts.use('/:id', getById(Post), post.routes());

export default posts;
