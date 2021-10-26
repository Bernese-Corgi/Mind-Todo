import { Mindmap } from '../../model';
import { validateRequest } from '../../utils';

/* ------------------------------- 마인드맵 목록 조회 ------------------------------- */
// GET /api/mindmaps
export const listMindmap = async (ctx) => {
  // TODO 필터링
  // TODO 페이지네이션
  try {
    // mind map 컬렉션에서 list 받아오기
    const mindmaps = await Mindmap.find().sort({ _id: -1 });

    // mindmap list를 응답
    ctx.body = mindmaps;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* --------------------------------- 마인드맵 작성 -------------------------------- */
// POST /api/mindmaps
export const writeMindmap = async (ctx) => {
  //
};

/* ------------------------- 개별 마인드맵 조회 (= 전체 노드 조회) ------------------------ */
// GET /api/mindmaps/:mindmapId
export const readMindmap = async (ctx) => {
  //
};

/* --------------------------- 개별 마인드맵 수정 (타이틀 수정) -------------------------- */
// PATCH /api/mindmaps/:mindmapId
export const udpateMindmap = async (ctx) => {
  //
};

/* ------------------------------- 개별 마인드맵 삭제 ------------------------------- */
// DELETE /api/mindmaps/:mindmapId
export const removeMindmap = async (ctx) => {
  //
};

/* -------------------------------- 개별 노드 작성 -------------------------------- */
// POST /api/mindmaps/:mindmapId
export const writeNode = async (ctx) => {
  //
};

/* -------------------------------- 개별 노드 조회 -------------------------------- */
// GET /api/mindmaps/:mindmapId/:nodeId
export const readNode = async (ctx) => {
  //
};

/* -------------------------------- 개별 노드 수정 -------------------------------- */
// PATCH /api/mindmaps/:mindmapId/:nodeId
export const updateNode = async (ctx) => {
  //
};

/* -------------------------------- 개별 노드 삭제 -------------------------------- */
// DELETE /api/mindmaps/:mindmapId/:nodeId
export const removeNode = async (ctx) => {
  //
};
