import asyncHandler from 'express-async-handler';
import { Comment, validateCreateComment, validateUpdateComment } from '../models/Comment.js';
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
  const comments = await Comment.find().populate('user').populate('postId');
  res.status(200).json(comments);
});

/**-----------------------------------------
 * @desc    Get all comments
 * @router  /api/comments/:id
 * @method  GET
 * @access  public
------------------------------------------*/
const getAllCommentsPerPostIdCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Post ID is required' });
  }

  try {
    const comments = await Comment.find({ postId: id })
    .populate('user')
    .sort({ createdAt: -1 });
    
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
})

/**-----------------------------------------
 * @desc    Delete comment
 * @router  /api/comments/:id
 * @method  DELETE
 * @access  private (only admin or owner of the comment)
------------------------------------------*/
const deleteCommentCtrl = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: "comment not found" });
  if (req.user.isAdmin || req.user.id == comment.user) {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "comment has been deleted" });
  } else res.status(403).json({ message: "access denied, not allowed" }); 
})


/**-----------------------------------------
 * @desc    Update comment
 * @router  /api/comments/:id
 * @method  PATCH 
 * @access  private (only owner of the comment)
------------------------------------------*/
const updateCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateComment(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(400).json({ message: "comment not found" });
  if (req.user.id != comment.user) {
    return res.status(403).json({ message: "access denied, only user himself can edit his comment" });
  }

  const updateComment = await Comment.findByIdAndUpdate(req.params.id, {
    $set: {
      text: req.body.text,
    }
  }, { new: true });

  res.status(200).json(updateComment);
})

export { createCommentCtrl, getAllCommentsCtrl, getAllCommentsPerPostIdCtrl, deleteCommentCtrl, updateCommentCtrl }; 