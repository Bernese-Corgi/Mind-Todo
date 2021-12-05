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
  node: {
    type: Schema.Types.ObjectId,
    ref: 'Node',
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Node',
    default: null,
  },
});

const MindmapSchema = new Schema({
  publisher: {
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
 * parentId가 주어지지 않는 경우 root node로 저장하기 위해, name과 parentId를 초기화해서 반환한다.
 * @param {*} parentId 찾을 parent node의 id
 * @returns parentNode가 null이면 name과 parentId를 초기값으로 설정해서 node로서 반환하고, parentNode가 존재하면 그대로 반환
 */
NodeSchema.statics.findParentNodeById = async function (parentId) {
  const parentNode = await this.findById(parentId);
  const defaultParentNode = { name: '', parentId: null };

  return parentNode ? parentNode : defaultParentNode;
};

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

  return await Node.findByIdAndUpdate(id, nextData, {
    new: true,
  }).exec();
};

NodeSchema.statics.savePostInNode = async function (id, data) {
  return await Node.findByIdAndUpdate(id, { post: data }, { new: true }).exec();
};

/**
 * nodeId로 node를 찾아서 그 내부의 todos 정보를 풀어서 반환한다.
 * @param {*} nodeId 찾을 node의 id
 * @returns 해당하는 node의 내부에 저장된 todos 정보
 */
NodeSchema.statics.findTodosByNodeId = async function (nodeId) {
  const node = await this.findById(nodeId);
  const { todos } = await Node.findOne({ todos: node.todos }).populate('todos');
  return todos;
};

/**
 * nodeId로 node를 찾아서 그 내부의 post 정보를 풀어서 반환한다.
 * @param {*} nodeId 찾을 node의 id
 * @returns 해당하는 node의 내부에 저장된 post 정보
 */
NodeSchema.statics.findPostByNodeId = async function (nodeId) {
  const node = await this.findById(nodeId);
  const { post } = await Node.findOne({ post: node.post }).populate('todos');
  return post;
};

/* ------------------------------ Node 인스턴스 메서드 ----------------------------- */
/**
 * 인스턴스(도큐먼트)에서 post와 todos를 찾아서 객체로 묶어 반환한다.
 * @returns post, todos를 객체로 묶어서 반환한다.
 */
NodeSchema.methods.findPostAndTodosByNode = async function () {
  const { post } = await Node.findOne({ post: this.post }).populate('post');
  const { todos } = await Node.findOne({ todos: this.todos }).populate('todos');
  return { post, todos };
};

export const Node = model('Node', NodeSchema);
export const Tree = model('Tree', TreeSchema);

const Mindmap = model('Mindmap', MindmapSchema);

export default Mindmap;
