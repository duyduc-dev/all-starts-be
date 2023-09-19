import commentModel from '@/models/commentModel';
import UserModel from '@/models/userModels';

export const index = async (req, res) => {
  res.status(200).json({
    message: 'Test api [GET] /api/v1/comment',
  });
};
export const getAllComments = async (req, res) => {
  try {
    const comments = await commentModel.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const createComment = async (req, res) => {
  const { idPost, user, comments } = req.body;

  try {
    const existingUser = await UserModel.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: 'user không tìm thấy' });
    }
    // tạo mới comment
    const newComment = new commentModel({ idPost, user, comments });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//cập nhật comment
export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { comments } = req.body;

  try {
    const existingComment = await commentModel.findById(id);
    if (!existingComment) {
      return res.status(404).json({ message: 'không tìm thấy comment' });
    }
    existingComment.comments = comments;
    await existingComment.save();

    res.status(200).json(existingComment);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//xóa comment
export const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const existingComment = await commentModel.findByIdAndDelete(id);
    if (!existingComment) {
      return res.status(404).json({ message: 'không tìm thấy comment' });
    }

    res.status(200).json('đã xóa comments');
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
  index,
};
