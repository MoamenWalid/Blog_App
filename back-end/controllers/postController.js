import fs from "node:fs";
import path from "node:path";
import asyncHandler from "express-async-handler";
import { Post, validateCreatePost, validateUpdatePost } from "../models/Post.js";
import { cloudinaryUploadImage } from "../utils/cloudinary.js";
import { dirName } from "../middlewares/photoUpload.js";

/**-----------------------------------------
 * @desc    Create new post
 * @router  /api/posts
 * @method  POST
 * @access  private (only logged in user)
------------------------------------------*/

const createPostCtrl = asyncHandler(async (req, res) => {
  // Validation for image
  if (!req.file) return res.status(400).json({ message: "no image provided" });

  // Validation for data
  const { error } = validateCreatePost(req.body);
  if (error) res.status(400).json({ message: error.details[0].message });

  // Upload photo
  const iamgePath = path.join(dirName, `/photos/${req.file.filename}`);
  const result = await cloudinaryUploadImage(iamgePath);

  // Create new post and save it to DB
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id
    }
  })
  await post.save();

  // Send response to the client
  res.status(201).json(post);

  // Remove image from the server
  fs.unlinkSync(iamgePath);
});

/**-----------------------------------------
 * @desc    Get all posts
 * @router  /api/posts
 * @method  GET
 * @access  public
------------------------------------------*/

const getAllPostsCtrl = asyncHandler(async (req, res) => {
  const { page, category } = req.query;
  const  POST_PER_PAGE = 3;
  const skip = (page - 1) * POST_PER_PAGE;
  const query = {};

  if (category) query.category = category;
  let posts = await Post.find(query)
  .skip(page && skip)
  .limit(page && POST_PER_PAGE)
  .sort({ createdAt: -1 })
  .populate('user', ["-password"]);

  res.status(200).json(posts);
})


/**-----------------------------------------
 * @desc    Get single post
 * @router  /api/posts/:id
 * @method  GET
 * @access  public
------------------------------------------*/

const getSinglePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('user', ["-password"]);
  if (!post) return res.status(404).json({ message: 'post not found' });
  res.status(200).json(post);
})


/**-----------------------------------------
 * @desc    Get posts count
 * @router  /api/posts/count
 * @method  GET
 * @access  public
------------------------------------------*/

const getPostsCountCtrl = asyncHandler(async (req, res) => {
  const count = await Post.countDocuments();
  res.status(200).json({ count });
})

export { createPostCtrl, getAllPostsCtrl, getSinglePostCtrl, getPostsCountCtrl };