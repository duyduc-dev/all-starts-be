import mongoose from 'mongoose';

const storySchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    type: {
      type: String,
    },
    url: {
      type: String,
    },
    likes: {
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

const storyModel = mongoose.model('story', storySchema);

export default storyModel;
