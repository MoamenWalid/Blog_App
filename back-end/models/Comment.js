import mongoose from 'mongoose';
import Joi from 'joi';

// Comment schema
const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Comment Model
const Comment = mongoose.model("Comment", commentSchema);

// Validate create comment
const validateCreateComment = (obj) => {
  const schema = Joi.object({
    postId: Joi.string().required().label("post id"),
    text: Joi.string().trim().required().label("text")
  });

  return schema.validate(obj);
};

// Validate update comment
const validateUpdateComment = (obj) => {
  const schema = Joi.object({
    text: Joi.string().trim().required()
  });

  return schema.validate(obj);
};

export { Comment, validateCreateComment, validateUpdateComment };
