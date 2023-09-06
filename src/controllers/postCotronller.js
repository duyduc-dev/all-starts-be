import asyncHandler from 'express-async-handler';

import PostsModel from '@/models/postModels';
import UserModel from '@/models/userModels';
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
      console.log('🚀 ~ file: postCotronller.js:19 ~ getAllPosts:asyncHandler ~ page:', page);
      const size = parseInt(req.query.size) || 10;
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
    console.log(
      '🚀 ~ file: postCotronller.js:45 ~ getAllOwnerPosts:asyncHandler ~ userId:',
      userId,
    );

    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
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
    const { title, content, backgroundColor, image } = req.body;
    const userId = req.user.id;

    //find the user who is create the post
    const currentUser = await UserModel.findById(userId);

    if (!currentUser) {
      res.status = 400;
      throw new Error('Không tìm thấy User');
    }

    //create new post
    const newPost = new PostsModel({
      title,
      content,
      backgroundColor,
      user: userId,
    });

    //save post to database
    await newPost.save();

    res.json({
      data: newPost,
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
};

export default postController;
