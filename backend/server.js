const express = require("express")
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


//Middlewares
app.use(express.json())

app.use("/api/products", productRouter)

app.get("/", (req, res) => {
    res.status(200).send("success")
})