import { model, Schema } from 'mongoose';

const NodeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mindmapId: {
    type: Schema.Types.ObjectId,
    ref: 'Mindmap',
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
});

const TreeSchema = new Schema({
  nodeId: {
    type: Schema.Types.ObjectId,
    ref: 'Node',
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Node',
    default: null,
  },
});

const MindmapSchema = new Schema({
  publisherId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: [TreeSchema],
    // TODO default값 추가
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/* ------------------------------- Node 정적 메서드 ------------------------------ */
/**
 * node에 포함되는 데이터 중, ref로 참조하고 있는 데이터들이 생성될 때, 해당 데이터의 id를 node 도큐먼트 내부에 저장하는 메서드
 * @param {*} id 찾을 node의 id
 * @param {*} data 찾은 node에 업데이트할 정보
 * @param propName 이 인수를 지정하면, 해당 인수를 프로퍼티 이름으로서 정보를 찾는다. 지정하지 않으면. data를 생성한 모델 이름의 소문자가 기본값으로 주어진다.
 * @returns 업데이트된 node 도큐먼트를 반환한다.
 */
NodeSchema.statics.updateNodeChild = async function (
  id,
  data,
  propName = data.constructor.modelName.toLowerCase(),
) {
  const node = await Node.findById(id);

  const matchKey = Object.keys(node.toObject()).find((key) => {
    return key === (Array.isArray(node[key]) ? `${propName}s` : propName);
  });

  const nextData = Array.isArray(node[matchKey])
    ? { [matchKey]: [...node[matchKey], data] }
    : { [matchKey]: data._id };

  return await Node.findByIdAndUpdate(data.nodeId, nextData, {
    new: true,
  }).exec();
};

export const Node = model('Node', NodeSchema);
export const Tree = model('Tree', TreeSchema);

const Mindmap = model('Mindmap', MindmapSchema);

export default Mindmap;
