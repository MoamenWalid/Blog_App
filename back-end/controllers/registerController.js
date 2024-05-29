import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import { User, validateRegisterUser } from "../models/User.js";

/**-----------------------------------------
 * @desc    register new user
 * @router  /api/auth/register
 * @method  POST
 * @access  public
  -----------------------------------------*/

const registerUserCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateRegisterUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // User exist or not
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ message: "user already exist" });

  // Hash password and save new user
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(req.body.password, salt);
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword
  })
  await user.save();

  // Send a response to client
  res.status(201).json({ message: "you registered successfully, please log in" })
});

export { registerUserCtrl };