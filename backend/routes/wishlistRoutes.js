const express = require('express');
const router = express.Router();

const {getWishlistProducts , addProductToWishlist  } = require("../controllers/wishlistController");

// Get Wishlist Products

router.get("/" , getWishlistProducts)

// POST Wishlist product

router.post("/:id" , addProductToWishlist)

module.exports = router