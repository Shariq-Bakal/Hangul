const express = require("express")
require("dotenv").config()


const app = express();

app.get("/" , (req,res) => {
    res.status(200).send("success")
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`App listened to ${PORT}`)
})
