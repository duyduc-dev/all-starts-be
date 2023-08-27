import express from 'express';

import { apiPath } from '@/constants';
import authController from '@/controllers/authController';
import { authMiddleware } from '@/middlewares/authMiddleware';
const authRouter = express.Router();

authRouter.post(apiPath.register, authController.register);
authRouter.post(apiPath.login, authController.login);
authRouter.get(apiPath.index, authController.index);
authRouter.get(apiPath.me, authMiddleware, authController.me);

export default authRouter;
