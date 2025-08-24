import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: {
      type: String,
      required: true,
      select: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [6, "Email must be atleast 6 characters long"],
      maxlength: [50, "Email must not be 50 characers long"],
    },
    avatar: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    address: {
      type: Object,
    },
    cartData: { type: Object, default: {} },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    refreshToken: {type: String}
  },
  { minimize: false }
);

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
userSchema.methods.isPasswordValid = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJwt = async function (id, refreshToken) {
  if (refreshToken) {
    return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
  } else {
    return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  }
};

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
