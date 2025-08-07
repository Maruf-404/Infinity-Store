import express from "express"
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus, verifyStripe, verifyRazorpay} from "../controllers/order.controller.js"
import adminAuth from "../middleware/adminAuth.js"
import userAuth from "../middleware/userAuth.js"

const orderRouter = express.Router() 

// Admin Features
orderRouter.get("/all", adminAuth, allOrders)
orderRouter.put("/status", adminAuth, updateOrderStatus)

orderRouter.post("/place", userAuth, placeOrder)
orderRouter.post("/stripe", userAuth, placeOrderStripe)
orderRouter.post("/verifystripe", userAuth, verifyStripe)
orderRouter.post("/razorpay", userAuth, placeOrderRazorpay)
orderRouter.post("/verifyRazorpay", userAuth, verifyRazorpay)

orderRouter.get("/userorders", userAuth, userOrders)



export default orderRouter