import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import * as postUtils from '../../utils/postUtils';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', postUtils.checkLoggedIn, postsCtrl.write);

const post = new Router();

post.get('/', postsCtrl.read);
post.patch(
  '/',
  postUtils.checkLoggedIn,
  postUtils.checkOwnPost,
  postsCtrl.update,
);
post.delete(
  '/',
  postUtils.checkLoggedIn,
  postUtils.checkOwnPost,
  postsCtrl.remove,
);

posts.use('/:id', postUtils.getPostById, post.routes());

export default posts;
