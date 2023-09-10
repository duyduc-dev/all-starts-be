import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

import UserModel from '@/models/userModels';

cloudinary.config({
  cloud_name: 'djwvklgcn',
  api_key: '783165928642335',
  api_secret: 'Ft3m4JyMzh_4txzUrdwDvvVEi9s',
});

class UserController {
  async index(req, res) {
    res.json({
      message: 'Test api [GET] /api/v1/user',
    });
  }

  //[Put] /user/:id
  //update user
  async updateUser(req, res) {
    const userId = req.params.id;
    const body = req.body;

    if (body.userId === userId || body.isAdmin) {
      if (body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          body.password = await bcrypt.hash(body.password, salt);
        } catch (error) {
          return res.status(500).json(error);
        }
      }
      try {
        await UserModel.findByIdAndUpdate(userId, {
          $set: body,
        });
        res.status(200).json('User đã được updated');
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    } else {
      return res.status(403).json('bạn chỉ update với user của bạn');
    }
  }

  //[delete] /user/:id
  //delete user
  async remove(req, res) {
    const userId = req.params.id;
    const body = req.body;

    if (body.userId === userId || body.isAdmin) {
      try {
        await UserModel.findByIdAndDelete(userId);
        res.status(200).json('User đã được delete');
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    } else {
      return res.status(403).json('bạn chỉ delete với user của bạn');
    }
  }

  //[Get] /user/:id
  //Get a user
  async getUser(req, res) {
    const userId = req.params.id;

    try {
      const user = await UserModel.findById(userId).select('-password');
      //hide password and updateAt
      // const { password, updateAt, ...other } = user;
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
    }
  }

  //[Put] /user/:id/follow
  //follow a user
  async follow(req, res) {
    const userId = req.params.id;
    const body = req.body;

    if (body.userId !== userId) {
      try {
        const user = await UserModel.findById(userId);
        const currentUser = await UserModel.findById(body.userId);
        if (!user.followers.includes(body.userId)) {
          await user.updateOne({ $push: { followers: body.userId } });
          await currentUser.updateOne({ $push: { followings: body.userId } });
          res.status(200).json('bạn đã theo dõi');
        } else {
          res.status(403).json('bạn đã đang theo dõi');
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    } else {
      res.status(403).json('bạn không thể theo dõi chính bạn');
    }
  }

  //[Put] //user/:id/unfollow
  //unfollow a user
  async unfollow(req, res) {
    const userId = req.params.id;
    const body = req.body;

    if (body.userId !== userId) {
      try {
        const user = await UserModel.findById(userId);
        const currentUser = await UserModel.findById(body.userId);
        if (user.followers.includes(body.userId)) {
          await user.updateOne({ $pull: { followers: body.userId } });
          await currentUser.updateOne({ $pull: { followings: body.userId } });
          res.status(200).json('bạn đã hủy theo dõi');
        } else {
          res.status(403).json('bạn hủy theo dõi rồi');
        }
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    } else {
      res.status(403).json('bạn không thể hủy theo dõi chính bạn');
    }
  }

  //[Post] /user/upload-avatar
  //upload avatar a user
  async upload_avatar(req, res) {
    try {
      // step 1: add file from client to server
      const file = req.file;

      const { id } = req.user;

      // step 2: upload file to cloudinary => url
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: 'auto',
        folder: 'Web_70_Social_App',
      });

      const avatarUrl = result && result.secure_url;

      //step 3: remove temp image
      fs.unlinkSync(file.path);

      //step 4: url => mongodb
      const updateUser = await UserModel.findOneAndUpdate(
        { _id: id },
        { profilePicture: avatarUrl },
        { new: true },
      ).select('-password');

      return res.json({
        message: 'Upload avatar successfully',
        data: updateUser,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

const userController = new UserController();
export default userController;
