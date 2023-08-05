const express = require("express")
const multer = require("multer")
const mongoose = require("mongoose")
const productRouter = require("./routes/productRoutes")
require("dotenv").config()


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

  
const upload = multer({ dest : "uploads/"})


//Middlewares
app.use(express.json())

app.use(express.urlencoded({extended : false}))

app.use("/uploads" , express.static(__dirname + "/uploads"))

app.use("/api/products",upload.single("productImg") , productRouter)

app.get("/", (req, res) => {
    res.status(200).send("success")
})