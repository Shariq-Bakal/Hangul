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
    const { _id , productName, productPrice, productDescription, productDiscountPrice, Cod, productsCategory, productImg } = req.body.singleProduct;

    const {token} = req.cookies;

    try {
        jwt.verify(token , process.env.SECRET_KEY , {} , async (err , info ) => {
            if (err) throw err
            const user = await User.findById(info.id)
            user.wishlist.push(_id)
            const response = await user.save();
            console.log(response)

            res.status(201).json({
                message: "Product added to wishlist successfully",
                success: true,
                response
            })
        })
        // const wishlistProduct = await Wishlist.create({ _id , productName, productPrice, productDescription, productDiscountPrice, Cod, productsCategory, productImg });
     
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