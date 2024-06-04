import express from 'express';
import { photoUpload } from '../middlewares/photoUpload.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';
import {
  createPostCtrl,
  deletePostCtrl,
  getAllPostsCtrl,
  getPostsCountCtrl,
  getSinglePostCtrl,
  toggleLikeCtrl,
  updatePostCtrl, 
  updatePostImageCtrl
} from '../controllers/postController.js';

const routerPosts = express.Router();

// /api/posts
routerPosts.route('/')
  .post(verifyToken, photoUpload.single('image'), createPostCtrl)
  .get(getAllPostsCtrl)

// /api/posts/count
routerPosts.route('/count')
  .get(getPostsCountCtrl);

// /api/posts/:id
routerPosts.route('/:id')
  .get(validateObjectId, getSinglePostCtrl)
  .delete(validateObjectId, verifyToken, deletePostCtrl)
  .patch(validateObjectId, verifyToken, updatePostCtrl)

// /api/posts/update-image/:id
routerPosts.route('/update-image/:id')
  .patch(validateObjectId, verifyToken, photoUpload.single('image'), updatePostImageCtrl);

// /api/posts/like/:id
routerPosts.route('/like/:id')
  .patch(validateObjectId, verifyToken, toggleLikeCtrl);

export { routerPosts };