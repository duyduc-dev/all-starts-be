import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    comments: {
      type: Array,
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timeStane: true },
);

const commentModel = mongoose.model('comment', commentSchema);

export default commentModel;
