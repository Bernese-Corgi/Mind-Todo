import { Todo } from '../../model';

/* -------------------------------- todo list ------------------------------- */
// GET /api/todos
export const list = async (ctx) => {
  // TODO 쿼리 파라미터로 투두 필터링 (+ nodeId)
  // TODO 페이지네이션
  try {
    // todos 컬렉션에서 todo list 받아오기
    const todos = await Todo.find().sort({ _id: -1 });
    // todos 응답
    ctx.body = todos;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const write = async (ctx) => {
  // POST /api/todos
};

export const update = async (ctx) => {
  // PATCH /api/todos/:id
};

export const remove = async (ctx) => {
  // DELETE /api/todos/:id
};
