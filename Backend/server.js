import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import "dotenv/config"
import connectDb from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"
import cartRouter from "./routes/cart.Route.js"
import orderRouter from "./routes/order.route.js"
import cookieParser from "cookie-parser"

const app = express()

const port = process.env.PORT || 4000
connectDb()
connectCloudinary()

app.use(cookieParser());
app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN === "*" ? "*" : process.env.CORS_ORIGIN.split(","),
    credentials: true
}))

app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("Server Working")
})

app.listen(port, () => console.log("Server started on port "+ port)
)