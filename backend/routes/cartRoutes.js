const express = require('express');
const router = express.Router();

const {getCartProducts , addProductToCart  } = require("../controllers/cartController");

// Get Cart Products

router.get("/" , getCartProducts)

// POST cart product

router.post("/:id" , addProductToCart)



module.exports = router