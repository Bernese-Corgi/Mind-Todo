import { model, Schema } from 'mongoose';

const PostSchema = new Schema({
  publisherId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  nodeId: {
    type: Schema.Types.ObjectId,
    ref: 'Node',
  },
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
