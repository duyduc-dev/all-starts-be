import express from 'express';

import { apiPath } from '@/constants';
import authController from '@/controllers/authController';

const authRouter = express.Router();

authRouter.get(apiPath.index, authController.index);
authRouter.post(apiPath.login, authController.login);
authRouter.post(apiPath.signup, authController.signup);

export default authRouter;
