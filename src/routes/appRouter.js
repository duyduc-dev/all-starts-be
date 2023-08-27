import express from 'express';

import { apiPath } from '@/constants';
import appController from '@/controllers/appController';

const appRouter = express.Router();

appRouter.get(apiPath.index, appController.index);

export default appRouter;
