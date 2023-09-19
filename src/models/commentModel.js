import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    idPost: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', 
      required: true,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timeStane: true },
);

const commentModel = mongoose.model('comment', commentSchema);

export default commentModel;
