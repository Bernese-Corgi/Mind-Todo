import { model, Schema } from 'mongoose';

const PostSchema = new Schema({
  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // TODO Mindmap의 node 데이터와 관계 설정
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = model('Post', PostSchema);

export default Post;
