import express from 'express';

import uploadFile from '@/configs/multer.config';
import { apiPath } from '@/constants';
import storyController from '@/controllers/storyController';
import { authMiddleware } from '@/middlewares/authMiddleware';

const storyRouter = express.Router();

storyRouter.use(authMiddleware);

storyRouter.get(apiPath.index, storyController.index);
storyRouter.get(apiPath.getAllStory, storyController.getAllStory);
storyRouter.post(apiPath.upload_story, uploadFile.single('story'), storyController.story);

export default storyRouter;
