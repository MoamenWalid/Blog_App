import asyncHandler from "express-async-handler";
import { User, validateUpdateUser } from "../models/User.js";
import { response } from "express";
import path from "node:path";
import fs from "node:fs";
import bcrypt from "bcryptjs";
import { dirName } from "../middlewares/photoUpload.js";
import {
  cloudinaryRemoveImage,
  cloudinaryUploadImage,
} from "../utils/cloudinary.js";

/**-----------------------------------------
 * @desc    Get all users profile
 * @router  /api/users/profile
 * @method  GET
 * @access  private (only admin)
------------------------------------------*/

const getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

/**-----------------------------------------
 * @desc    Get users count
 * @router  /api/users/count
 * @method  GET
 * @access  private (only admin)
------------------------------------------*/

const getUsersCountCtrl = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).json({ count });
});

/**-----------------------------------------
 * @desc    Get user profile
 * @router  /api/users/profile/:id
 * @method  GET
 * @access  public
------------------------------------------*/

const getSingleUserCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password").populate('posts');
  if (!user) return res.status(400).json({ message: "user not found" });
  res.status(200).json(user);
});

/**-----------------------------------------
 * @desc    update user profile
 * @router  /api/users/profile/:id
 * @method  PATCH
 * @access  private (only user himself)
------------------------------------------*/

const updateUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error)
    return response.status(400).json({ message: error.details[0].message });
  if (req.body.password) {
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
  }
  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio,
      },
    },
    { new: true }
  ).select("-password");

  res.status(200).json(updateUser);
});

/**-----------------------------------------
 * @desc    Profile photo upload
 * @router  /api/users/profile/profile-photo-upload
 * @method  POST
 * @access  private (only logged in user)
------------------------------------------*/

const profilePhotoUploadCtrl = asyncHandler(async (req, res) => {
  // Validation
  if (!req.file) return res.status(400).json({ message: "no file provided" });

  // Get the path to the image
  const iamgePath = path.join(dirName, `/photos/${req.file.filename}`);

  // Upload to cloudinary
  const result = await cloudinaryUploadImage(iamgePath);

  // Get the user from DB
  const user = await User.findById(req.user.id);

  // Delete the old profile photo if exist
  if (user.profilePhoto.publicId !== null) await cloudinaryRemoveImage(user.profilePhoto.publicId);

  // Change the profilePhoto field in the DB
  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  await user.save();

  // Send response to client
  res.status(200).json({
    message: "your profile photo upload successfully",
    profilePhoto: { url: result.secure_url, publicId: result.public_id },
  });

  // Remove image from the server
  fs.unlinkSync(iamgePath);
});

/**-----------------------------------------------
 * @desc    Delete user profile (Account)
 * @router  /api/users/profile/:id
 * @method  DELETE
 * @access  private (only admin or user himself)
------------------------------------------------*/

const deleteUserProfileCtrl = asyncHandler(async (req, res) => {
  // Get the user from DB
  const user = await User.findById(req.params.id);
  if (!user) return res.status(400).json({ message: "user not found" });


  // Get all posts from DB
  // Get the public ids from the posts
  // Delete all posts image from cloudinary that belong to this user
  // Delete the profile picture from cloudinary
  await cloudinaryRemoveImage(user.profilePhoto.publicId);

  // Delete user posts & comments
  // Delete the user himself
  await User.findByIdAndDelete(req.params.id);

  // Send a response to the client
  res.status(200).json({ message: "your profile has been deleted" });
});

export {
  getAllUsersCtrl,
  getUsersCountCtrl,
  getSingleUserCtrl,
  updateUserCtrl,
  profilePhotoUploadCtrl,
  deleteUserProfileCtrl,
};
