import { model, Schema } from 'mongoose';

const TreeSchema = new Schema({
  name: String,
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
  children: [TreeSchema],
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
    type: TreeSchema,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Tree = model('Tree', TreeSchema);

const Mindmap = model('Mindmap', MindmapSchema);

export default Mindmap;
