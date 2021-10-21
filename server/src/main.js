require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import api from './api';
import mongoose from 'mongoose';
import jwtMiddleware from './lib/jwtMiddleware';

/* ------------------------------- 환경 변수 파일 참조 ------------------------------ */
// process.env 내부 값에 대한 레퍼런스
const { PORT, MONGO_URI } = process.env;

/* ------------------------------- mongoose 설정 ------------------------------ */
// 서버와 데이터베이스 연결
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

/* --------------------------------- 라우터 설정 --------------------------------- */
// api 라우트 적용
router.use('/api', api.routes());

/* --------------------------------- 미들웨어 적용 -------------------------------- */
/* 라우터 전에 적용해야할 미들웨어 --------------------------- */
// bodyParser 적용
app.use(bodyParser());
// jwtMiddleware 적용
app.use(jwtMiddleware);

/* app 인스턴스에 라우터 적용 ---------------------------- */
app.use(router.routes()).use(router.allowedMethods());

/* ---------------------------------- 포트 지정 --------------------------------- */
const port = PORT || 4000; // PORT가 지정되어 있지 않다면 4000을 사용

app.listen(port, () => {
  console.log('Listening to port %d', port);
});
