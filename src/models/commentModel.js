import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: {
    type: Object,
    ref: 'users',
    required: true,
  },
  postId: {
    type: String,
    ref: 'posts',
  },
  comment: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
    timeStane: true,
  },
});

const commentModel = mongoose.model('comment', commentSchema);

export default commentModel;
