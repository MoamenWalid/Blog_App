import asyncHandler from 'express-async-handler';
import { Category, validateCreateCategory } from '../models/Category.js';


/**-----------------------------------------
 * @desc    Create new Category
 * @router  /api/categories
 * @method  POST
 * @access  private (only admin)
------------------------------------------*/
const createCategoryCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateCategory(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Check if category already exists
  const existingCategory = await Category.findOne({ title: req.body.title });
  if (existingCategory) {
    return res.status(400).json({ message: "Category already exists" });
  }

  const category = new Category({
    title: req.body.title,
    user: req.user.id,
    img: {
      url: req.body.img ? req.body.img : "https://cdn-icons-png.flaticon.com/512/7515/7515677.png"
    }
  });
  await category.save();
  res.status(201).json(category);
});


/**-----------------------------------------
 * @desc    Get all categories
 * @router  /api/categories
 * @method  GET
 * @access  public
------------------------------------------*/
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
})


/**-----------------------------------------
 * @desc    Delete category
 * @router  /api/categories/:id
 * @method  DELETE
 * @access  private (only admin)
------------------------------------------*/
const deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "category not found" });
  await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Category has been deleted", categoryId: category._id });
})

export { createCategoryCtrl, getAllCategories, deleteCategoryCtrl };