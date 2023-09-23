const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

const getCartProducts = async(req, res) => {
    const {token} = req.cookies
    try {
        jwt.verify(token , process.env.SECRET_KEY , {} , async (err , info ) => {
            if (err) throw err
            const user = await User.findById({_id : info.id}).populate("cart")
            const cartProducts = user.cart
            res.status(200).json({
                success: true,
                message: "All cart products",
                totalCount: cartProducts.length,
                cartProducts
            });
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Problem in fetching cart products",
            success: false,
            error
        })
    }
}

const addProductToCart = (req, res) => {
    const { _id } = req.body.singleProduct;

    const {token} = req.cookies;

    try {
        jwt.verify(token , process.env.SECRET_KEY , {} , async ( err , info ) => {
            if (err) throw err
            const user = await User.findByIdAndUpdate(
                info.id,{
                $push : {cart : _id},    
                },
                {
                    new : true
                })

            res.status(201).json({
                message: "Product added to cart successfully",
                success: true,
                productId : _id
            })
        })
     
    } catch (error) {
        res.status(500).json({
            message: "Problem in adding product to cart",
            success: false,
            error
        })
    }
}

// Removing cart products

const removeCartProduct = async(req, res) => {

    const { id } = req.params
    const {token} = req.cookies
    try {
        jwt.verify(token , process.env.SECRET_KEY , {} , async (err , info ) => {
            if (err) throw err
            const user = await User.findByIdAndUpdate(
                info.id,{
                $pull : {cart : id},    
                },
                {
                    new : true
                })

            res.status(201).json({
                message: "Product deleted from cart successfully",
                success: true,
                productId : id
            })
        })

    } catch (error) {
        res.status(500).json({
            message: "Problem in removing product from cart",
            success: false,
            error
        })
    }
}

module.exports = {
    getCartProducts,
    addProductToCart,
    removeCartProduct
}