import express from 'express';

import uploadFile from '@/configs/multer.config';
import { apiPath } from '@/constants';
import userController from '@/controllers/userController';
import { authMiddleware } from '@/middlewares/authMiddleware';

const userRouter = express.Router();

userRouter.use(authMiddleware);

userRouter.get(apiPath.index, userController.index);
userRouter.get(apiPath.id, userController.getUser);
userRouter.put(apiPath.id, userController.updateUser);
userRouter.delete(apiPath.id, userController.remove);
userRouter.put(apiPath.id + apiPath.follow, userController.follow);
userRouter.post(apiPath.upload_avatar, uploadFile.single('avatar'), userController.upload_avatar);
userRouter.put(apiPath.id + apiPath.unfollow, userController.unfollow);

export default userRouter;
