import userModel from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    try {
        let authHeaders = req.headers.authorization;      
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: token missing" });
  }

  const token = authHeaders.split(" ")[1];

  const decode = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await userModel.findById(decode._id);
  if (!user) {
    return res.status(401).json({ success: false, message: "invalid token" });
  }
  

  req.user = user;
  next();
    } catch (error) {
       return res
      .status(401)
      .json({ success: false, message: error });
    }
};

export default userAuth