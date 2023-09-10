import mongoose from 'mongoose';

const storySchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    image: {
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
      ref: 'user',
      required: true,
    },
  },
  { timeStane: true },
);

const storyModel = mongoose.model('story', storySchema);

export default storyModel;
