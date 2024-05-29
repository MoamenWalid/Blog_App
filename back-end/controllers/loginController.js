import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import { User, validateLoginUser } from "../models/User.js";

/**-----------------------------------------
 * @desc    Login user
 * @router  /api/auth/login
 * @method  POST
 * @access  public
  -----------------------------------------*/

const loginUserCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateLoginUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message })

  // User exist or not
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "invalid email or password" });

  // Compare password hash
  const isPasswordMatch = bcrypt.compareSync(req.body.password, user.password);
  if (!isPasswordMatch) return res.status(400).json({ message: "invalid email or password" });

  // Generate token
  const token = user.generateAuthToken();

  // Send a response to client
  const { _id, isAdmin, profilePhoto } = user;
  res.status(200).json({ _id, isAdmin, profilePhoto, token });
})

export { loginUserCtrl };