const express = require("express")
const multer = require("multer")
const cors = require("cors")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/productRoutes")
const orderRouter = require("./routes/ordersRoutes");
const userRouter = require("./routes/userRoutes");
require("dotenv").config()

const cartRouter = require("./routes/cartRoutes")
const wishlistRouter = require("./routes/wishlistRoutes");
const Stripe = require("./routes/stripeRoutes")

const app = express();
const { PORT, MONGODB_URL } = process.env;

//connecting to mongo db
app.listen(PORT, () => {
    console.log(`App listened to ${PORT}`)
    mongoose.connect(MONGODB_URL).then(() => {
        console.log("Mongodb successfully connected");
    }).catch((error) => {
        console.log({ error: error.message })
    })
})

const upload = multer({ dest: "uploads/" })


//Middlewares
app.use(express.json())

app.use(cors())

app.use(cookieParser())

app.use(express.urlencoded({ extended: false }))

app.use("/uploads", express.static(__dirname + "/uploads"))

app.use("/api/products", upload.single("productImg"), productRouter)

app.use("/api/cart", cartRouter)

app.use("/api/wishlist", wishlistRouter)

app.use("/api/orders", orderRouter)

app.use("/api/user", userRouter)

app.use("/api/Stripe" , Stripe )



app.get("/", (req, res) => {
    res.status(200).send("successfully started")
})