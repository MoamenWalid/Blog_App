import asyncHandler from "express-async-handler";
import { User, validateUpdateUser } from "../models/User.js";
import { response } from "express";
import bcrypt from "bcryptjs";

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
 * @desc    Get single user profile
 * @router  /api/users/profile/:id
 * @method  GET
 * @access  public
------------------------------------------*/

const getSingleUserCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
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
  console.log(req.file);
  res.status(200).json({ message: "your profile photo upload successfully" });
});

export {
  getAllUsersCtrl,
  getUsersCountCtrl,
  getSingleUserCtrl,
  updateUserCtrl,
  profilePhotoUploadCtrl,
};
