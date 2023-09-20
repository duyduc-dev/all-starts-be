import asyncHandler from 'express-async-handler';

import PostsModel from '@/models/postModels';
import UserModel from '@/models/userModels';

//
//
const postController = {
  //[Get] /post
  index: asyncHandler(async (req, res) => {
    res.json({
      message: 'Test api [GET] /api/v1/post',
    });
  }),

  // [Get] /post/all
  // get all new feeds
  getAllPosts: asyncHandler(async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;

      const size = parseInt(req.query.size) || 20;
      const skip = (page - 1) * size;

      const posts = await PostsModel.find().skip(skip).limit(size);
      const totalPosts = await PostsModel.countDocuments();
      const totalPage = Math.ceil(totalPosts / size);

      return res.json({
        data: posts,
        pagination: {
          currentPage: page,
          pageSize: size,
          totalCounts: totalPosts,
          totalPage,
        },
      });
    } catch (error) {
      res.status(500).json('error');
    }
  }),

  //[Get] /post/owners
  //Get all post owners

  getAllOwnerPosts: asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 20;
    const skip = (page - 1) * size;

    const posts = await PostsModel.find({ user: userId }).skip(skip).limit(size);
    const totalPosts = await PostsModel.countDocuments();
    const totalPage = Math.ceil(totalPosts / size);

    res.json({
      data: posts,
      pagination: {
        currentPage: page,
        pageSize: size,
        totalCounts: totalPosts,
        totalPage,
      },
    });
  }),

  //[Post] /post/
  //Create a new post
  create: asyncHandler(async (req, res) => {
    const { content, images } = req.body;
    const { id, username, profilePicture } = req.user;

    //Tìm người dùng tạo bài đăng
    const currentUser = await UserModel.findById(id);

    if (!currentUser) {
      res.status(400);
      throw new Error('Không tìm thấy User');
    }

    //create new post
    const newPost = new PostsModel({
      content,
      images,
      user: { id, username, profilePicture },
      comments: [],
      likes: [],
    });

    //save post to database
    await newPost.save();

    res.json({
      data: newPost,
      // comment,
      message: 'Đã tạo mới 1 bài post thành công',
    });
  }),

  //[Get] /post/:id
  //get a post
  getSingle: asyncHandler(async (req, res) => {
    const postId = req.params.id;

    try {
      const post = await PostsModel.findById(postId);
      res.status(200).json(post);
    } catch (err) {
      res.json(500).json(err);
    }
  }),

  //[Delete] /post/:id
  //delete a post
  remove: asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const body = req.body;

    try {
      const post = await PostsModel.findById(postId);
      if (post.Id === body.userId) {
        await post.deleteOne();
        res.status(200).json('bài viết của bạn đã được xóa');
      } else {
        res.status(403).json('bạn chỉ được xóa trong bài viết của bạn');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }),
  //[Put] /post/:id
  //Update a post
  Update: asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const body = req.body;

    try {
      const post = await PostsModel.findById(postId);
      if (post.Id === body.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json('bài viết của bạn đã được cập nhật');
      } else {
        res.status(403).json('bạn chỉ được cập nhật trong bài viết của bạn');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }),

  //[Put] post/:id/like
  //like/dislike a post
  like: asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const body = req.body;
    try {
      const post = await PostsModel.findById(postId);
      if (!post.likes.includes(body.userId)) {
        await post.updateOne({ $push: { likes: body.userId } });
        res.status(200).json('đã thích bài viét này');
      } else {
        await post.updateOne({ $pull: { likes: body.userId } });
        res.status(200).json('bài viết đã bỏ thích');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }),
};

export default postController;
