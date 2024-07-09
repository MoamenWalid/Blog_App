import mongoose, { Schema } from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";

const schema = {
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  profilePhoto: {
    type: Object,
    default: {
      url: "../photos/profile.png",
      publicId: null
    },
  },
  bio: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
};

const UserSchema = new Schema(schema, { timeseries: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Populate posts that belongs to that this user when he/she get his/her profile
UserSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'user',
  localField: '_id'
})

// Generage auth token
UserSchema.methods.generateAuthToken = function () {
  const payload = { id: this._id, isAdmin: this.isAdmin };
  const secretKey = process.env.JWT_SECRET;
  const options = { expiresIn: "15d", algorithm: "HS256" };

  return jwt.sign(payload, secretKey, options);
};

// User model
const User = mongoose.model("User", UserSchema);

// Validate register user
const validateRegisterUser = (obj) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().trim().max(100).required().email(),
    password: Joi.string().trim().min(8).required(),
  });

  return schema.validate(obj);
};

// Validate login user
const validateLoginUser = (obj) => {
  const schema = Joi.object({
    email: Joi.string().trim().max(100).required().email(),
    password: Joi.string().trim().required(),
  });

  return schema.validate(obj);
};

// Validate update user
const validateUpdateUser = (obj) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100),
    password: Joi.string().trim().min(8),
    bio: Joi.string(),
  });

  return schema.validate(obj);
};

export { User, validateRegisterUser, validateLoginUser, validateUpdateUser };
