const Wishlist = require("../models/wishlistModel");

const getWishlistProducts = async(req, res) => {
    try {
        const wishlistProducts = await Wishlist.find({});
        res.status(200).json({
            success: true,
            message: "All Wishlist products",
            totalCount: wishlistProducts.length,
            wishlistProducts
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Problem in fetching wishlist products",
            success: false,
            error
        })
    }
}

const addProductToWishlist = async(req, res) => {
    const { _id , productName, productPrice, productDescription, productDiscountPrice, Cod, productsCategory, productImg } = req.body.singleProduct;

    try {
        const wishlistProduct = await Wishlist.create({ _id , productName, productPrice, productDescription, productDiscountPrice, Cod, productsCategory, productImg });
        res.status(201).json({
            message: "Product added to wishlist successfully",
            success: true,
            wishlistProduct
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Problem in adding product to wishlist",
            success: false,
            error
        })
    }
}

//removing wishlist
const removeProductFromWishlist = async(req, res) => {
    const { id } = req.params
    try {
        const product = await Wishlist.findByIdAndDelete({ _id: id })
        res.status(201).json({
            message: "Product removed from wishlist successfully",
            success: true,
            product
        })

    } catch (error) {
        res.status(500).json({
            message: "Problem in removing product from wishlist",
            success: false,
            error
        })

    }


}

module.exports = {
    getWishlistProducts,
    addProductToWishlist,
    removeProductFromWishlist


}