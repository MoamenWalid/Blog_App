import { Router } from 'express';
import { verifyTokenAndAdmin } from '../middlewares/verifyToken.js';
import { createCategoryCtrl, deleteCategoryCtrl, getAllCategories } from '../controllers/categoriesController.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';

const routerCategory = Router();

// /api/categories
routerCategory.route('/')
  .post(verifyTokenAndAdmin, createCategoryCtrl)
  .get(getAllCategories)

// /api/categories/:id
routerCategory.route('/:id')
  .delete(validateObjectId, verifyTokenAndAdmin, deleteCategoryCtrl)

export { routerCategory };