const Cart = require("../models/cartModel");
const jwt = require("jsonwebtoken");

const getCartProducts = async(req, res) => {
    try {
        const {token} = req.cookies;
        jwt.verify(token , process.env.SECRET_KEY , {} , async (err , info) => {
            if(err) throw err
            const cartProducts = await Cart.find({user : info.id});
            res.status(200).json({
                success: true,
                message: "All Cart products",
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

    const { productName, productPrice, productDescription, productDiscountPrice, Cod, productsCategory , _id, productImg } = req.body.singleProduct;

    const {token} = req.cookies;
    jwt.verify(token , process.env.SECRET_KEY , {} , async (err , info ) => {
        if (err) throw err
        const user = info;
        try {
            const cartProduct = await Cart.create({ _id , productName, user : user.id, productPrice, productDescription, productDiscountPrice, Cod, productsCategory, productImg });
    
            res.status(201).json({
                message: "Product added to cart successfully",
                success: true,
                cartProduct
            })
        } catch (error) {
            res.status(500).json({
                message: "Problem in adding product to cart",
                success: false,
                error
            })
        }
    })
    

}

// Removing cart products

const removeCartProduct = async(req, res) => {

    const { id } = req.params
    try {
        const product = await Cart.findByIdAndDelete({ _id: id })
        res.status(201).json({
            message: "Product deleted successfully",
            success: true,
            product
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Problem in deleting product from cart",
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