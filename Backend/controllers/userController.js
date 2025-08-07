import { validationResult } from "express-validator";
import { createUser } from "../services/userServices.js";
import userModel from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

// user login
const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ error: "user does not exist" });
  }

  const isMatch = await user.isPasswordValid(password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const token = await user.generateJwt(user._id);
  delete user._doc.password;
  res
    .status(200)
    .json({ success: true, message: "User login succesfully", user, token });
});

// user register
const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const user = await createUser(req.body);
  const token = await user.generateJwt(user._id); 
  delete user._doc.password;
  res
    .status(200)
    .json({ success: true, message: "User login successfully", user, token });
});

// admin login
const adminLogin = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    res
      .status(200)
      .json({ succes: true, message: "Admin login successfully", token });
  } else {
    res.status(401).json({ succes: false, message: "Invalid credentials" });
  }
});

const getUserProfile = asyncHandler((req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const user = req.user;
  delete user._doc.password;
  res
    .status(200)
    .json({ success: true, message: "User Profile Fetched", user });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  //   if (!errors.isEmpty()) {
  //   return res.status(400).json({ error: errors.array() });
  // }
  const { _id } = req.user;
  const { name, email, address } = req.body;

  const updatedUser = await userModel.findByIdAndUpdate(_id, {
    name,
    email,
    address,
  });
  res
    .status(200)
    .json({ success: true, message: "User Profile Updated", updatedUser });
});

const updateAvatar = asyncHandler(async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ error: errors.array() });
  // }
  const user = req.user;
  const { _id } = req.user;
  
  
  const image = req.files.image && req.files.image[0];

  if (!image) {
    return res
      .status(400)
      .json({ success: false, message: "Image file is required." });
  }
  let result = await cloudinary.uploader.upload(image.path, {
    resource_type: "image",
  });

  if (user.avatar.public_id) {
    await cloudinary.uploader.destroy(user.avatar.public_id);
  }

  const updatedUser = await userModel.findByIdAndUpdate(_id, {
    avatar: {
      url: result.secure_url,
      public_id: result.public_id,
    },
  });
  res
    .status(200)
    .json({ success: true, message: "avatar Updated", updatedUser });
});

export {
  loginUser,
  registerUser,
  adminLogin,
  getUserProfile,
  updateUserProfile,
  updateAvatar,
};
