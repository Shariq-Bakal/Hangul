const mongoose = require("mongoose");

const Schema = mongoose.Schema

const cartSchema = new Schema({
    _id : {
        required: true,
        type: String,
    },
    productName: {
        required: true,
        type: String
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    productPrice: {
        required: true,
        type: Number
    },
    productDescription: {
        required: true,
        type: String
    },
    productDiscountPrice: {
        required: true,
        type: String
    },
    productsCategory: {
        required: true,
        type: String
    },
    Cod: {
        required: true,
        type: Boolean
    },
    productImg: {
        required: true,
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model("Cart", cartSchema);