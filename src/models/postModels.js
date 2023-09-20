import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    images: {
      type: [String],
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    user: {
      type: Object,
      ref: 'users',
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timeStane: true },
);

const PostsModel = mongoose.model('post', PostSchema);

export default PostsModel;
