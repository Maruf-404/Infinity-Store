import userModel from "../models/userModel.js";

export const createUser = async ({ name, email, password, role }) => {
  if (!email && password && name) {
    throw new Error("Name, email and password is required");
  }

  const hashPassword = await userModel.hashPassword(password);

  const newUser = await userModel.create({
    name,
    email,
    password: hashPassword,
    role
  });

  return newUser;
};
