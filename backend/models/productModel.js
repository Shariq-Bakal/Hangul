const mongoose = require("mongoose");

const Schema = mongoose.Schema

const productSchema = new Schema({
    productName: {
        required: true,
        type: String
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

module.exports = mongoose.model("Model", productSchema);