import { Todo } from '../../model';
import { todoValidation } from '../../utils/validation';

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

/* --------------------------------- todo 작성 -------------------------------- */
// POST /api/todos
export const write = async (ctx) => {
  // request body 검증
  const validatedData = todoValidation(ctx.request.body);

  // request body의 스키마가 검증되지 않으면 bad request 에러
  if (validatedData.error) {
    ctx.status = 400;
    ctx.body = validatedData.error;
    return;
  }

  // request body에서 데이터 추출
  const { content } = ctx.request.body;

  // todo 인스턴스 생성
  // TODO node id 넣기
  const todo = new Todo({ content, publisherId: ctx.state.user });

  try {
    // todo document 저장
    await todo.save();
    // todo 응답
    ctx.body = todo;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const update = async (ctx) => {
  // PATCH /api/todos/:id
};

export const remove = async (ctx) => {
  // DELETE /api/todos/:id
};
