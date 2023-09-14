const Cart = require("../models/cartModel");

const getCartProducts = async(req, res) => {
    try {
        const cartProducts = await Cart.find({});
        res.status(200).json({
            success: true,
            message: "All Cart products",
            totalCount: cartProducts.length,
            cartProducts
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Problem in fetching cart products",
            success: false,
            error
        })
    }
}

const addProductToCart = async(req, res) => {

    //Destructuring property names from product object which is inside body itself

    const { productName, productPrice, productDescription, productDiscountPrice, Cod, productsCategory , _id, productImg } = req.body.singleProduct;
    
    try {
        const cartProduct = await Cart.create({ _id , productName, productPrice, productDescription, productDiscountPrice, Cod, productsCategory, productImg });

        res.status(201).json({
            message: "Product added to cart successfully",
            success: true,
            cartProduct
        })
    } catch (error) {
        console.log(error)
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