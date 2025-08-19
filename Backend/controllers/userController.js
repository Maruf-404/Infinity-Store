import { validationResult } from "express-validator";
import { createUser } from "../services/userServices.js";
import userModel from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

// user login

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    const accessToken = await user.generateJwt(userId);
    const refreshToken = await user.generateJwt(userId, true);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: true });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};

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
  delete user._doc.password;

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message: "User login succesfully",
      user,
      accessToken,
    });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;
  if (!incomingRefreshToken) {
    return res.status(401).json({ success: false, message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(incomingRefreshToken, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id);
    if (!user || incomingRefreshToken !== user.refreshToken) {
      return res.status(401).json({ success: false, message: "invalid refreshToken" });
    }


    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "accessToken refreshed",
        accessToken,
      });

  } catch (error) {
    console.error("Refresh token error:", error.message);
    return res.status(401).json({ success: false, message: "invalid or expired refreshToken" });
  }
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
  refreshAccessToken
};
