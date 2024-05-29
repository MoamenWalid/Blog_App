import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";

/**-----------------------------------------
 * @desc    Get all user profile
 * @router  /api/users/profile
 * @method  GET
 * @access  private (only admin)
------------------------------------------*/

const getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
})

export { getAllUsersCtrl };