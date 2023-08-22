import express from 'express';

import { apiPath } from '@/constants';

import authRouter from './authRouter';

const rootRouter = express.Router();

export default function routerConfig(app) {
  rootRouter.use(apiPath.auth, authRouter);

  app.use(apiPath.baseUrl + apiPath.v1, rootRouter);
}
