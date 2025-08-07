import userModel from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const userAuth = asyncHandler(async (req, res, next) => {
  let authHeaders = req.headers.authorization;
      
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: token missing" });
  }

  const token = authHeaders.split(" ")[1];

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userModel.findById(decode._id);
  if (!user) {
    return res.status(401).json({ success: false, message: "invalid token" });
  }
  

  req.user = user;
  next();
});

export default userAuth