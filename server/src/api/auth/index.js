import Router from 'koa-router';
import { signup } from './auth.ctrl';

const auth = new Router();

auth.post('/signup', signup);
auth.post('/signin');
auth.get('/check');
auth.post('/signout');

export default auth;
