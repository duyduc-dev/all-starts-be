import express from 'express';

import { apiPath } from '@/constants';

import appRouter from './appRouter';
import authRouter from './authRouter';
import userRouter from './userRouter';

const rootRouter = express.Router();

export default function routerConfig(app) {
  rootRouter.use(apiPath.auth, authRouter);
  rootRouter.use(apiPath.user, userRouter);

  app.use(apiPath.baseUrl + apiPath.v1, rootRouter);
  app.use(apiPath.index, appRouter);
}
