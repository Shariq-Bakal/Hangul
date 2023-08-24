const express = require('express');
const router = express.Router();

const { getCartProducts, addProductToCart, removeCartProduct } = require("../controllers/cartController");

// Get Cart Products

router.get("/", getCartProducts)

// POST cart product

router.post("/:id", addProductToCart)

//Delete cart product

router.delete("/:id", removeCartProduct)



module.exports = router