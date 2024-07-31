import express from 'express';
import { validateObjectId } from '../middlewares/validateObjectId.js';
import { verifyTokenAndAdmin } from '../middlewares/verifyToken.js';
import { updateStausOfMember } from '../controllers/usersController.js';

const routerAdmin = express.Router();

// /admin-dashboard/users/:id
routerAdmin.route('/users/:id')
  .patch(validateObjectId, verifyTokenAndAdmin, updateStausOfMember)

export { routerAdmin };