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
    backgroundColor: {
      type: String,
    },
    image: {
      type: String,
    },
    likes: {
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
