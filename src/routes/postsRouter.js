import express from 'express';

import uploadFile from '@/configs/multer.config';
import { apiPath } from '@/constants';
import postController from '@/controllers/postCotronller';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { validationMdw } from '@/middlewares/validate.middleware';
import PostValidationSchema from '@/validations/postValidation';

const postRouter = express.Router();

postRouter.use(authMiddleware);

postRouter.get(apiPath.all, postController.getAllPosts);
postRouter.get(apiPath.owners, postController.getAllOwnerPosts);
postRouter.post(
  apiPath.index,
  validationMdw(PostValidationSchema),
  uploadFile.array('images'),
  postController.create,
);
postRouter.put(apiPath.id, postController.Update);
postRouter.put(apiPath.id + apiPath.like, postController.like);
postRouter.delete(apiPath.id, postController.remove);
postRouter.get(apiPath.id, postController.getSingle);

postRouter.get(apiPath.index, postController.index);

export default postRouter;
