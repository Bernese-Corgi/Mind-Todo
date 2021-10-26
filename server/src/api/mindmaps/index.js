import Router from 'koa-router';
import * as mindmapsCtrl from './mindmaps.ctrl';

/* --------------------------------- 마인드맵 목록 -------------------------------- */
const mindmaps = new Router();
// 마인드맵 목록 조회
mindmaps.get('/', mindmapsCtrl.listMindmap);
// 마인드맵 작성
mindmaps.post('/', mindmapsCtrl.writeMindmap);

/* --------------------------------- 개별 마인드맵 -------------------------------- */
const mindmap = new Router();
// 개별 마인드맵 조회 (= 전체 노드 조회)
mindmaps.get('/', mindmapsCtrl.readMindmap);
// 개별 마인드맵 수정 (타이틀 수정)
mindmap.patch('/', mindmapsCtrl.udpateMindmap);
// 개별 마인드맵 삭제
mindmap.delete('/', mindmapsCtrl.removeMindmap);
// 개별 노드 작성
mindmap.post('/', mindmapsCtrl.writeNode);
// /api/mindmaps/:id
mindmaps.use('/:id', mindmap.routes());

/* ---------------------------------- 개별 노드 --------------------------------- */
const node = new Router();
// 개별 노드 조회
node.get('/', mindmapsCtrl.readNode);
// 개별 노드 수정
node.patch('/', mindmapsCtrl.updateNode);
// 개별 노드 삭제
node.delete('/', mindmapsCtrl.removeNode);
// /api/mindmaps/:id/:id
mindmap.use('/:id', node.routes());

export default mindmaps;
