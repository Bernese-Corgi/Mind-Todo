import { model, Schema } from 'mongoose';

const TodoSchema = new Schema({
  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // TODO Mindmap의 node 데이터와 관계 설정
  content: {
    type: String,
    required: true,
  },
  completed: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = model('Todo', TodoSchema);

export default Todo;
