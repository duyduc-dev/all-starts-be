import express from 'express';

const commentRouter = express.Router();

commentRouter.post('/:id/comment');

export default commentRouter;
