import { validationResult } from "express-validator";
import asyncHandler  from "../utils/asyncHandler.js";
import userModel from "../models/userModel.js";

const addToCart = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { itemId, size } = req.body;
  const { _id, cartData } = req.user;

  if (cartData[itemId]) {
    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }
  } else {
    cartData[itemId] = {};
    cartData[itemId][size] = 1;
  }

  const addedCart = await userModel.findByIdAndUpdate(_id, { cartData });
  res.status(200).json({ success: true, message: "Added to cart", addedCart });
});

const updateCart = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { itemId, size, quantity } = req.body;
  const { _id, cartData } = req.user;
  cartData[itemId][size] = quantity;
  const updatedCart = await userModel.findByIdAndUpdate(_id, { cartData });
  res.status(200).json({ success: true, message: "Cart Updated", updatedCart });
});

const getUserCart = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { cartData } = req.user;

  res.status(200).json({ success: true, message: "Cart fetched", cartData });
});

export { addToCart, updateCart, getUserCart };
