import mongoose from 'mongoose';
import { Post, User } from '../../model';
import { Node } from '../../model/Mindmap';
import { validateRequest } from '../../utils';

const { ObjectId } = mongoose.Types;

/* -------------------------------- list post ------------------------------- */
// GET /api/post
export const list = async (ctx) => {
  // TODO 쿼리 파라미터로 포스트 필터링
  const { tag, username } = ctx.query;

  const user = await User.findByUsername(username);

  const query = {
    ...(username ? { publisher: user._id } : {}),
    ...(tag ? { tags: tag } : {}),
  };
  // TODO 페이지네이션
  try {
    // post 컬렉션에서 post list 받아오기
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .populate('publisher')
      .lean()
      .exec();

    // posts를 응답
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* ------------------------------- write post ------------------------------- */
// POST /api/posts
export const write = async (ctx) => {
  // request body 스키마 검증
  const { error } = validateRequest('write_post', ctx.request.body);
  // request body의 스키마가 검증되지 않으면 에러를 발생시킨다.
  if (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }

  // request body에서 데이터 추출
  const { title, body, tags } = ctx.request.body;

  const { nodeId } = ctx.params;

  if (!nodeId) {
    ctx.status = 400;
    ctx.body = 'nodeId가 없습니다.';
    return;
  }

  const { mindmapId } = await Node.findById(nodeId);

  // post 인스턴스 생성
  const post = new Post({
    title,
    body,
    tags,
    publisher: ctx.state.user,
    nodeId,
    mindmapId,
  });

  // node 도큐먼트에 post 정보 넣기
  const updatedNode = await Node.savePostInNode(ctx.params.nodeId, post);

  // id 값으로 node 데이터를 찾을 수 없으면 Not Found
  if (!updatedNode) {
    ctx.status = 404;
    ctx.body = 'node를 찾을 수 없습니다.';
    return;
  }

  try {
    // post document 저장
    await post.save();
    await updatedNode.save();
    // post 응답
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* --------------------------- read specific post --------------------------- */
// GET /api/posts/:postId
export const read = async (ctx) => {
  // const post = ctx.state.post;
  // console.log(post);
  const { postId } = ctx.params;

  const post = await Post.findById(postId).populate([
    {
      path: 'publisher',
      select: 'username email',
    },
    {
      path: 'mindmapId',
      select: 'body',
      populate: {
        path: 'body',
        populate: [
          { path: 'node', select: 'name _id' },
          { path: 'parent', select: 'name _id' },
        ],
      },
    },
  ]);

  try {
    if (!ObjectId.isValid(postId)) {
      ctx.status = 400;
      ctx.body = `url의 params의 값이 ObjectId 형식에 맞지 않습니다.`;
      return;
    }

    if (!post) {
      ctx.status = 404;
      ctx.body = `존재하지 않는 post입니다`;
      return;
    }
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = post;
};

/* -------------------------- update specific post -------------------------- */
// PATCH /api/posts/:postId
export const update = async (ctx) => {
  // request body 스키마 검증
  const { error } = validateRequest('update_post', ctx.request.body);
  // request body의 스키마가 검증되지 않으면 에러를 발생시킨다.
  if (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }

  // 파라미터에서 id 추출
  const { postId } = ctx.params;

  // 현재 request body 데이터 (수정된 내용) 복사
  const nextData = { ...ctx.request.body };

  try {
    // params에서 추출한 id로 post를 찾고, 수정된 데이터를 넣는다.
    const post = await Post.findByIdAndUpdate(postId, nextData, {
      new: true, // 업데이트된 데이터를 반환
    }).exec();

    // id로 포스트를 찾을 수 없으면 not found
    if (!post) {
      ctx.status = 404;
      return;
    }
    // 수정된 데이터를 응답
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* ------------------------------- remove post ------------------------------ */
// DELETE /api/posts/:postId
export const remove = async (ctx) => {
  // params에서 id를 받아온다.
  const { postId } = ctx.params;
  try {
    // params에서 받아온 id와 일치하는 post를 삭제
    await Post.findByIdAndRemove(postId).exec();
    // No Content
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};
