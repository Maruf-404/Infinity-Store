import { validationResult } from "express-validator";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import Stripe from "stripe";
import Razorpay from "razorpay";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_SECRET_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET, 
})

const currency = "inr";
const deliveryCharges = 10;

const placeOrder = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { _id } = req.user;
  const { items, amount, address } = req.body;
  const orderData = {
    userId: _id,
    items,
    amount,
    address,
    paymentMode: "COD",
    payment: false,
    date: Date.now(),
  };

  const newOrder = await orderModel.create(orderData);
  await userModel.findByIdAndUpdate(_id, { cartData: {} });

  res.status(200).json({ success: true, message: "Order Placed", newOrder });
});

const placeOrderStripe = asyncHandler(async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { _id } = req.user;
  const { origin } = req.headers;
  const { items, amount, address } = req.body;
  const orderData = {
    userId: _id,
    items,
    amount,
    address,
    paymentMode: "Stripe",
    payment: false,
    date: Date.now(),
  };

  const newOrder = await orderModel.create(orderData);
  const line_items = items.map((item) => ({
    price_data: {
      currency: currency,
      product_data: {
        name: item.name,
      },
      unit_amount: amount * 100,
    },
    quantity: item.quantity,
  }));

  line_items.push({
    price_data: {
      currency: currency,
      product_data: {
        name: "Delivery Charges",
      },
      unit_amount: deliveryCharges * 100,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    line_items,
    mode: "payment",
  });

  res
    .status(200)
    .json({
      success: true,
      message: "Stripe Payment link is generated",
      session_url: session.url,
    });
});

const verifyStripe = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { orderId, success } = req.body;
  if (success === "true") {
    await orderModel.findByIdAndUpdate(orderId, { payment: true });
    await userModel.findByIdAndUpdate(_id, { cartData: {} });
    res.status(200).json({ success: true, message: "Order Placed by stripe" });
  } else {
    await orderModel.findByIdAndDelete(orderId);
    res.status(402).json({ success: false, message: "Stripe Payment Failed" });
  }
});

const placeOrderRazorpay = asyncHandler(async (req, res) => {
      const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { _id } = req.user;
  const { origin } = req.headers;
  const { items, amount, address } = req.body;
  const orderData = {
    userId: _id,
    items,
    amount,
    address,
    paymentMode: "Razorpay",
    payment: false,
    date: Date.now(),
  };

  const newOrder = await orderModel.create(orderData);
  const options = {
    amount: amount * 100,
    currency: currency.toUpperCase(),
    receipt: newOrder._id.toString()
  }
  await razorpay.orders.create(options, (error, order) => {
    if (error) {
      console.log(error);
      return res.status(402).json({success: false, message: error.message})
    }
    res.status(200).json({ success: true, message: "Razorpay Running successfully", order });
  })

});

const verifyRazorpay = asyncHandler(async (req, res) => {
      const {_id} = req.user
      const { razorpay_order_id } = req.body
      const orderInfo = await razorpay.orders.fetch(razorpay_order_id)
      if (orderInfo.status === "paid") {
         await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment: true})
         await userModel.findByIdAndUpdate(_id, {cartData: {}})
         res.status(200).json({success: true, message: "Payment Successfull"})
      }else {
        await orderModel.findByIdAndDelete(orderInfo.receipt)
        res.status(402).json({success: true, message: "Payment Failed"})
      }
})

const allOrders = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const orders = await orderModel.find({});
  res.status(200).json({ success: true, message: "All Order", orders });
});

const userOrders = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { _id } = req.user;
  const allOrders = await orderModel.find({ userId: _id });
  res
    .status(200)
    .json({ success: true, message: "All User Orders Fetched", allOrders });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;

  const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status });

  res.status(200).json({ success: true, message: "Order Status Updated" });
});

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateOrderStatus,
  verifyStripe,
  verifyRazorpay
};
