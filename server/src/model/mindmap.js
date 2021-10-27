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

export const Node = model('Node', NodeSchema);
export const Tree = model('Tree', TreeSchema);

const Mindmap = model('Mindmap', MindmapSchema);

export default Mindmap;
