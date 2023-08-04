const express = require("express");
const router = express.Router();
const { getAllProducts, postProduct, getSingleProduct, deleteProduct } = require("../controllers/productController")

//Get all products
router.get("/", getAllProducts)



//Get single product
router.get("/:id", getSingleProduct);




//Post product
router.post("/", postProduct)



//Delete product
router.delete("/:id", deleteProduct)

module.exports = router