import bcrypt from 'bcrypt';

import UserModel from '@/models/userModels';

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
  async delete(req, res) {
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
}

const userController = new UserController();
export default userController;
