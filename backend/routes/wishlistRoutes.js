const express = require('express');
const router = express.Router();

const { getWishlistProducts, addProductToWishlist, removeProductFromWishlist } = require("../controllers/wishlistController");

// Get Wishlist Products

router.get("/", getWishlistProducts)

// POST Wishlist product

router.post("/:id", addProductToWishlist)

//Delete Wishlist product

router.delete("/:id", removeProductFromWishlist)

module.exports = router