import express from 'express';

import { apiPath } from '@/constants';
import authController from '@/controllers/authController';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { validationMdw } from '@/middlewares/validate.middleware';
import loginSchema from '@/validations/loginValidation';
import registerSchema from '@/validations/registerValidation';

const authRouter = express.Router();

authRouter.get(apiPath.index, authController.index);
authRouter.post(apiPath.register, validationMdw(registerSchema), authController.register);
authRouter.post(apiPath.login, validationMdw(loginSchema), authController.login);
authRouter.get(apiPath.me, authMiddleware, authController.me);

console.log('FIle change');

export default authRouter;
