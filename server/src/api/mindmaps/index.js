import Router from 'koa-router';
import { Mindmap } from '../../model';
import { Node } from '../../model/Mindmap';
import { getById } from '../../utils';
import { checkLoggedIn, checkOwn } from '../../utils/checkUser';
import * as mindmapsCtrl from './mindmaps.ctrl';

/* --------------------------------- 마인드맵 목록 -------------------------------- */
const mindmaps = new Router();
// 마인드맵 목록 조회
mindmaps.get('/', checkLoggedIn, mindmapsCtrl.listMindmap);
// 마인드맵 작성
mindmaps.post('/', checkLoggedIn, mindmapsCtrl.writeMindmap);

/* --------------------------------- 개별 마인드맵 -------------------------------- */
const mindmap = new Router();
// 개별 마인드맵 조회 (= 전체 노드 조회)
mindmap.get('/', mindmapsCtrl.readMindmap);
// 개별 마인드맵 수정 (타이틀 수정)
mindmap.patch('/', checkOwn(Mindmap), mindmapsCtrl.udpateMindmap);
// 개별 마인드맵 삭제
mindmap.delete('/', checkOwn(Mindmap), mindmapsCtrl.removeMindmap);
// 개별 노드 작성
mindmap.post('/', checkOwn(Mindmap), mindmapsCtrl.writeNode);
// /api/mindmaps/:mindmapId
mindmaps.use('/:mindmapId', getById(Mindmap), checkLoggedIn, mindmap.routes());

/* ---------------------------------- 개별 노드 --------------------------------- */
const node = new Router();
// 개별 노드 조회
node.get('/', mindmapsCtrl.readNode);
// 개별 노드 수정
node.patch('/', checkOwn(Node), mindmapsCtrl.updateNode);
// 개별 노드 삭제
node.delete('/', checkOwn(Node), mindmapsCtrl.removeNode);
// /api/mindmaps/:mindmapId/:nodeId
mindmaps.use(
  '/:mindmapId/:nodeId',
  getById(Node),
  checkLoggedIn,
  node.routes(),
);

export default mindmaps;
