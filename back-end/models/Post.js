import mongoose, { Schema } from "mongoose";
import Joi from "joi";

// Post schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    default: {
      url: "",
      publicId: null
    }
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Populate comment for this post
postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "postId",
  localField: "_id"
});

// Post model
const Post = mongoose.model('Post', postSchema);

// Validate create post
const validateCreatePost = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200).required(),
    description: Joi.string().trim().min(10).required(),
    category: Joi.string().trim().required(),
  });

  return schema.validate(obj);
};

// Validate update post
const validateUpdatePost = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200),
    description: Joi.string().trim().min(10),
    category: Joi.string().trim(),
  });

  return schema.validate(obj);
};

export { Post, validateCreatePost, validateUpdatePost };
