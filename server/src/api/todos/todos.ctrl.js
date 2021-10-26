import { Todo } from '../../model';
import { todoUpdateValidation, todoValidation } from '../../utils/validation';

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

/* ------------------------------- update todo ------------------------------ */
// PATCH /api/todos/:id
export const update = async (ctx) => {
  // request body 스키마 검증
  const validatedData = todoUpdateValidation(ctx.request.body);

  // request body의 스키마가 검증되지 않으면 에러를 발생시킨다.
  if (validatedData.error) {
    ctx.status = 400;
    ctx.body = validatedData.error;
    return;
  }

  // 파라미터에서 id 추출
  const { id } = ctx.params;

  // 현재 request body 데이터 (수정된 내용) 복사
  const nextData = { ...ctx.request.body };

  try {
    // params에서 추출한 id로 todo를 찾고, 수정된 데이터를 넣는다.
    const todo = await Todo.findByIdAndUpdate(id, nextData, {
      new: true,
    }).exec();

    // id로 todo를 찾을 수 없으면 not found
    if (!todo) {
      ctx.status = 404;
      return;
    }
    // 수정된 데이터를 응답
    ctx.body = todo;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* ------------------------------- remove todo ------------------------------ */
// DELETE /api/todos/:id
export const remove = async (ctx) => {
  // params에서 id를 받아온다.
  const { id } = ctx.params;

  try {
    // params에서 받아온 id와 일치하는 todo 삭제
    await Todo.findByIdAndRemove(id).exec();
    // No content
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};
