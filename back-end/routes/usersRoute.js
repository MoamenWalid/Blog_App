import express from 'express';
import { getAllUsersCtrl, getSingleUserCtrl, getUsersCountCtrl, updateUserCtrl } from '../controllers/usersController.js';
import { verifyTokenAndAdmin, verifyTokenAndOnlyUser } from '../middlewares/verifyToken.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';

const routerUsers = express.Router();

// /api/users/profile 
routerUsers.route('/profile').get(verifyTokenAndAdmin, getAllUsersCtrl);

// /api/users/count 
routerUsers.route('/count').get(verifyTokenAndAdmin, getUsersCountCtrl);

// /api/users/profile/:id
routerUsers.route('/profile/:id')
  .get(validateObjectId, getSingleUserCtrl)
  .patch(validateObjectId, verifyTokenAndOnlyUser, updateUserCtrl)

export { routerUsers };