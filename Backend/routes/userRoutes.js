import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  getUserProfile,
  updateUserProfile,
  updateAvatar,
  refreshAccessToken
} from "../controllers/userController.js";
import { body } from "express-validator";
import userAuth from "../middleware/userAuth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters long"),
  registerUser
);
userRouter.post(
  "/login",
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters long"),
  loginUser
);
userRouter.post("/admin", adminLogin);
userRouter.get("/profile", userAuth, getUserProfile)
userRouter.put("/profile", userAuth, updateUserProfile)
userRouter.post("/avatar", upload.fields([{name: "image", maxCount: 1}]), userAuth, updateAvatar)
userRouter.post("/refresh-token", refreshAccessToken)

export default userRouter;
