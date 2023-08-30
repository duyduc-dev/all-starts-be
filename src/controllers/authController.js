import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '@/models/userModels';

class AuthController {
  // [GET] /auth/
  index(req, res) {
    res.json({
      message: 'Test api [GET] /api/v1/auth',
    });
  }

  // [POST] /auth/login
  async login(req, res) {
    try {
      const { email, password, phone, fullname } = req.body;
      //1. Validation
      if (!email || !password || !phone || !fullname) {
        return res.status(400).json({
          message: 'vui lòng điền đủ vào các ô',
        });
      }
      //2.check authentication
      const existingUser = await UserModel.findOne({ email });

      if (!existingUser) {
        return res.status(401).json({
          message: 'User chưa tồn tại',
        });
      }

      //3. check password
      const isMatchPassword = await bcrypt.compare(password, existingUser.password);

      if (!isMatchPassword) {
        return res.status(401).json({
          message: 'User chưa tồn tại',
        });
      }

      //create JWT Token
      const jwtPayLoad = {
        email: existingUser.email,
        id: existingUser.id,
        username: existingUser.username,
        fullname: existingUser.fullname,
      };

      const token = jwt.sign(jwtPayLoad, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });

      //Response to Client
      res.json({
        accessToken: token,
        message: 'Đăng nhập thành công',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  // [POST] /auth/register
  async register(req, res) {
    try {
      const { username, email, password, phone, fullname } = req.body;
      //1. Validation

      if (!username || !email || !password || !phone || !fullname) {
        return res.status(400).json({
          message: 'vui lòng điền đủ vào các ô',
        });
      }

      //2. check User exit

      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        return res.json({
          message: 'User này đã tồn tại ',
        });
      }

      //3.Create new User, insert into DB
      //3.1 Has password (mã hóa Password)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //3.2 create new user object
      const newUser = new UserModel({
        username,
        email,
        phone,
        fullname,
        password: hashedPassword,

      });

      //insert new record into collection
      await newUser.save();

      //4. Response to client
      res.status(201).json({
        message: 'Đã tạo user thành công',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  //me
  async me(req, res) {
    const { id } = req.user;
    const currentUser = await UserModel.findById(id).select('-password');

    res.json({
      userInfo: currentUser,
    });
  }
}

const authController = new AuthController();

export default authController;
