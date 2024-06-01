import express from "express";
import {
  getAllUsersCtrl,
  getSingleUserCtrl,
  getUsersCountCtrl,
  profilePhotoUploadCtrl,
  updateUserCtrl,
} from "../controllers/usersController.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndOnlyUser,
} from "../middlewares/verifyToken.js";
import { validateObjectId } from "../middlewares/validateObjectId.js";
import { photoUpload } from "../middlewares/photoUpload.js";

const routerUsers = express.Router();

// /api/users/profile
routerUsers.route("/profile").get(verifyTokenAndAdmin, getAllUsersCtrl);

// /api/users/count
routerUsers.route("/count").get(verifyTokenAndAdmin, getUsersCountCtrl);

// /api/users/profile/:id
routerUsers.route("/profile/:id")
  .get(validateObjectId, getSingleUserCtrl)
  .patch(validateObjectId, verifyTokenAndOnlyUser, updateUserCtrl);

// /api/users/profile/profile-photo-upload
routerUsers.route("/profile/profile-photo-upload")
  .post(verifyToken, photoUpload.single("image"), profilePhotoUploadCtrl);

export { routerUsers };
