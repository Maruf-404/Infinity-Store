import jwt from "jsonwebtoken";
import  asyncHandler  from "../utils/asyncHandler.js";

const adminAuth = asyncHandler(async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized login" });
  }

  const token = authHeaders.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized login" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ success: false, message: "Access denied" });
  }
  req.admin = decoded;
  next();
});

export default adminAuth;
