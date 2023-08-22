import express from 'express';

import { apiPath } from '@/constants';
import authController from '@/controllers/authController';

const authRouter = express.Router();

authRouter.get(apiPath.index, (req, res) => {
  res.json({
    message: 'hello',
  });
});
authRouter.post(apiPath.login, authController.login);

export default authRouter;
