import { model, Schema } from 'mongoose';

const TodoSchema = new Schema({
  publisherId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // TODO Mindmap의 node 데이터와 관계 설정
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
