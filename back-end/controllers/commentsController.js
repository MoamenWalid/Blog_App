import asyncHandler from 'express-async-handler';
import { Comment, validateCreateComment } from '../models/Comment.js';
import { User } from '../models/User.js';

/**-----------------------------------------
 * @desc    Create new comment
 * @router  /api/comments
 * @method  POST
 * @access  private (only logged in user)
------------------------------------------*/
const createCommentCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateCreateComment(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  
  const profile = await User.findById(req.user.id);
  const comment = new Comment({
    postId: req.body.postId,
    text: req.body.text,
    user: req.user.id,
    username: profile.username
  })
  await comment.save();

  res.status(201).json(comment);
})


/**-----------------------------------------
 * @desc    Get all comments
 * @router  /api/comments
 * @method  GET
 * @access  private (only admin)
------------------------------------------*/
const getAllCommentsCtrl = asyncHandler(async (req, res) => {
  const comments = await Comment.find().populate('user');
  res.status(200).json(comments);
})

export { createCommentCtrl, getAllCommentsCtrl }; 