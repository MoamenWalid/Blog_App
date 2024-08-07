import { Router } from 'express';
import { verifyToken, verifyTokenAndAdmin } from '../middlewares/verifyToken.js';
import { createCommentCtrl, deleteCommentCtrl, getAllCommentsCtrl, getAllCommentsPerPostIdCtrl, updateCommentCtrl } from '../controllers/commentsController.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';

const routerComments = Router();

// /api/comments
routerComments.route('/')
  .post(verifyToken, createCommentCtrl)
  .get(verifyTokenAndAdmin, getAllCommentsCtrl)

// /api/comments/:id
routerComments.route('/:id')
  .get(getAllCommentsPerPostIdCtrl)
  .delete(validateObjectId, verifyToken, deleteCommentCtrl)
  .patch(validateObjectId, verifyToken, updateCommentCtrl);
export { routerComments };