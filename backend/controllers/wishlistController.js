const Wishlist = require("../models/wishlistModel");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

const getWishlistProducts = async(req, res) => {
    const {token} = req.cookies
    try {
        jwt.verify(token , process.env.SECRET_KEY , {} , async (err , info ) => {
            if (err) throw err
            const user = await User.findById({_id : info.id}).populate("wishlist")
            const wishlistProducts = user.wishlist
            res.status(200).json({
                success: true,
                message: "All Wishlist products",
                totalCount: wishlistProducts.length,
                wishlistProducts
            });
        })
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
    const { _id } = req.body.singleProduct;

    const {token} = req.cookies;

    try {
        jwt.verify(token , process.env.SECRET_KEY , {} , async ( err , info ) => {
            if (err) throw err
            const user = await User.findByIdAndUpdate(
                info.id,{
                $push : {wishlist : _id},    
                },
                {
                    new : true
                })

            res.status(201).json({
                message: "Product added to wishlist successfully",
                success: true,
                productId : _id
            })
        })
     
    } catch (error) {
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
    const {token} = req.cookies
    try {
        jwt.verify(token , process.env.SECRET_KEY , {} , async (err , info ) => {
            if (err) throw err
            const user = await User.findByIdAndUpdate(
                info.id,{
                $pull : {wishlist : id},    
                },
                {
                    new : true
                })

            res.status(201).json({
                message: "Product deleted from wishlist successfully",
                success: true,
                productId : id
            })
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