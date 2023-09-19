import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
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
  },
  { timeStane: true },
);

const PostsModel = mongoose.model('post', PostSchema);

export default PostsModel;
