import express from 'express';

import { apiPath } from '@/constants';
import commentController from '@/controllers/commentController';
import { authMiddleware } from '@/middlewares/authMiddleware';

const commentRouter = express.Router();

commentRouter.use(authMiddleware);

commentRouter.get(apiPath.index, commentController.index);
commentRouter.post(apiPath.create_comment, commentController.createComment);
commentRouter.put(apiPath.id + apiPath.update, commentController.updateComment);
commentRouter.get(apiPath.all, commentController.getAllComments);
commentRouter.delete(apiPath.id, commentController.deleteComment);

export default commentRouter;
