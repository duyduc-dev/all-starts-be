import { v2 as cloudinary } from 'cloudinary';
import asyncHandler from 'express-async-handler';
import fs from 'fs';

import PostsModel from '@/models/postModels';
import UserModel from '@/models/userModels';

cloudinary.config({
  cloud_name: 'djwvklgcn',
  api_key: '783165928642335',
  api_secret: 'Ft3m4JyMzh_4txzUrdwDvvVEi9s',
});
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
    const { content } = req.body;
    const file = req.files;
    const { id, username, profilePicture } = req.user;

    //Tìm người dùng tạo bài đăng
    const currentUser = await UserModel.findById(id);

    if (!currentUser) {
      res.status(400);
      throw new Error('Không tìm thấy User');
    }
    const uploadPromises = file.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: 'auto',
        folder: 'Web_70_Social_App',
      });

      fs.unlinkSync(file.path);

      return result.secure_url;
    });

    // eslint-disable-next-line no-undef
    const postUrls = await Promise.all(uploadPromises);

    //create new post
    const newPost = new PostsModel({
      content: content,
      images: postUrls,
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
