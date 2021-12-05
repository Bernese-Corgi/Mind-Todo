import { model, Schema } from 'mongoose';

const TodoSchema = new Schema({
  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  nodeId: {
    type: Schema.Types.ObjectId,
    ref: 'Node',
  },
  content: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = model('Todo', TodoSchema);

export default Todo;
