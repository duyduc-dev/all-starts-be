import express from 'express';

import { apiPath } from '@/constants';
import userController from '@/controllers/userController';
import { authMiddleware } from '@/middlewares/authMiddleware';

const userRouter = express.Router();

userRouter.use(authMiddleware);

userRouter.get(apiPath.index, userController.index);
userRouter.get(apiPath.id, userController.getUser);
userRouter.put(apiPath.id, userController.updateUser);
userRouter.delete(apiPath.id, userController.delete);
userRouter.put(apiPath.id + apiPath.follow, userController.follow);
userRouter.put(apiPath.id + apiPath.unfollow, userController.unfollow);

export default userRouter;
