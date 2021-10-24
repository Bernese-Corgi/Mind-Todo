import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.post('/signup', authCtrl.signup);
auth.post('/signin', authCtrl.signin);
auth.get('/check', authCtrl.check);
auth.post('/signout', authCtrl.signout);

export default auth;
