const Wishlist = require("../models/wishlistModel");

const getWishlistProducts = async (req , res) => {
    try { 
        const wishlistProducts = await Wishlist.find({});
        res.status(200).json({
            success : true,
            message : "All Cart products",
            totalCount : wishlistProducts.length,
            wishlistProducts});
        
    } catch(error) {
        console.log(error)
        res.status(500).json({
            message : "Problem in fetching wishlist products",
            success : false,
            error
        })
    }
}

const addProductToWishlist =  async (req,res) => {
    const { productName, productPrice, productDescription, productDiscountPrice, Cod, productsCategory } = req.body;

    try {
        const wishlistProduct = await Wishlist.create({productName, productPrice, productDescription, productDiscountPrice, Cod, productsCategory});
        res.status(201).json({
            message : "Product added to wishlist successfully",
            success : true,
            wishlistProduct
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            message : "Problem in adding product to cart",
            success : false,
            error
        })
    }
}

module.exports = {
    getWishlistProducts,
    addProductToWishlist
}