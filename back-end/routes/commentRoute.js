import { Router } from 'express';
import { verifyToken, verifyTokenAndAdmin } from '../middlewares/verifyToken.js';
import { createCommentCtrl, getAllCommentsCtrl } from '../controllers/commentsController.js';

const routerComments = Router();

// /api/comments
routerComments.route('/')
  .post(verifyToken, createCommentCtrl)
  .get(verifyTokenAndAdmin, getAllCommentsCtrl)

export { routerComments };