import fs from "node:fs";
import path from "node:path";
import asyncHandler from "express-async-handler";
import { Post, validateCreatePost, validateUpdatePost } from "../models/Post.js";
import { cloudinaryRemoveImage, cloudinaryUploadImage } from "../utils/cloudinary.js";
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
  .sort({ createdAt: -1 })
  .skip(page && skip)
  .limit(page && POST_PER_PAGE)
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
  const post = await Post.findById(req.params.id)
    .populate('user', ["-password"])
    .populate('comments');
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


/**-----------------------------------------------
 * @desc    Delete post
 * @router  /api/posts/:id
 * @method  DELETE
 * @access  private (only admin or user himself)
------------------------------------------------*/
const deletePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "post not found" });
  if (req.user.isAdmin || req.user.id == post.user.toString()) {
    await Post.findByIdAndDelete(req.params.id);
    await cloudinaryRemoveImage(post.image.publicId);
    await Comment.deleteMany({ postId: post._id });
    res.status(200).json({ message: "post has been deleted successfully", postId: post._id });
  } else {
    res.status(403).json({ message: 'access denied, forbidden' });
  }
})


/**-----------------------------------------------
 * @desc    Update post
 * @router  /api/posts/:id
 * @method  PATCH
 * @access  private (only user himself)
------------------------------------------------*/
const updatePostCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateUpdatePost(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  
  // Get the post from DB and check if post exist
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'post not found' });

  // Check if this post belong to only logged in user
  if (req.user.id !== post.user.toString()) {
    return res.status(403).json({ message: "access denied, you're not allowed" });
  }

  // Update post
  const updatePost = await Post.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category
    }
  }, { new: true }).populate('user', ["-password"]);

  // Send response to the client
  res.status(200).json(updatePost);
})


/**-----------------------------------------------
 * @desc    Update post image
 * @router  /api/posts/upload-image/:id
 * @method  PATCH
 * @access  private (only user himself)
------------------------------------------------*/
const updatePostImageCtrl = asyncHandler(async (req, res) => {
  // Validation
  if (!req.file) return res.status(400).json({ message: "no image provided" });

  // Get the post from DB and check if post exist
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'post not found' });

  // Check if this post belong to logged in user
  if (req.user.id !== post.user.toString()) {
    return res.status(403).json({ message: 'access denied, you are not allowed' });
  }

  // Delete the old image
  await cloudinaryRemoveImage(post.image.publicId);

  // Upload new photo
  const imagePath = path.join(dirName, `/photos/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  // Update the image field in the DB
  const updatePost = await Post.findByIdAndUpdate(req.params.id, {
    $set: {
      image: {
        url: result.secure_url,
        publicId: result.public_id
      }
    }
  }, { new: true });

  // Send response to client
  res.status(200).json(updatePost);

  // Remove new image from the server
  fs.unlinkSync(imagePath);
})


/**-----------------------------------------------
 * @desc    Toggle like
 * @router  /api/posts/like/:id
 * @method  PATCH
 * @access  private (only logged in user)
------------------------------------------------*/
const toggleLikeCtrl = asyncHandler(async (req, res) => {
  const { id: loggedInUser } = req.user;
  const { id: postId } = req.params;
  let post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'post not found' });

  const isPostAlreadyLiked = post.likes.find((user) => user.toString() == loggedInUser);
  if (isPostAlreadyLiked) {
    post = await Post.findByIdAndUpdate(postId, {
      $pull: { likes: loggedInUser }
    }, { new: true })
  } else {
    post = await Post.findByIdAndUpdate(postId, {
      $push: { likes: loggedInUser }
    }, { new: true })
  }

  res.status(200).json(post);
})


export {
  createPostCtrl,
  getAllPostsCtrl,
  getSinglePostCtrl,
  getPostsCountCtrl,
  deletePostCtrl,
  updatePostCtrl,
  updatePostImageCtrl,
  toggleLikeCtrl
};