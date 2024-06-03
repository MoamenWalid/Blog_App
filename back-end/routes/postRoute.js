import express from 'express';
import { photoUpload } from '../middlewares/photoUpload.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';
import { createPostCtrl, getAllPostsCtrl, getPostsCountCtrl, getSinglePostCtrl } from '../controllers/postController.js';

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
  .get(validateObjectId, getSinglePostCtrl);

export { routerPosts };