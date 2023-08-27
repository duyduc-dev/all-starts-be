import express from 'express';

import { apiPath } from '@/constants';

import authRouter from './authRouter';

const rootRouter = express.Router();

export default function routerConfig(app) {
  rootRouter.use(apiPath.auth, authRouter);

  app.use(apiPath.baseUrl + apiPath.v1, rootRouter);
  app.get(apiPath.index, (_, res) => {
    res.json({
      name: 'All stars',
      source_name: 'all-star-be',
      message: 'Welcome to "All Star Backend"',
      now: new Date(),
      instruction:
        "1. Clone source code from 'https://github.com/duyduc-dev/all-starts-be/tree/production'\n" +
        '2. Create file ".env". then add variable PORT=<your-port>. Example: PORT=3001\n' +
        '3. Then run with develop by "npm run dev"',
    });
  });
}
