import express from 'express';
import { getAllUsersCtrl } from '../controllers/usersController.js';
import { verifyTokenAndAdmin } from '../middlewares/verifyToken.js';

const routerUsers = express.Router();

// /api/users/profile 
routerUsers.route('/profile').get(verifyTokenAndAdmin, getAllUsersCtrl);

export { routerUsers };