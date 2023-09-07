const Order = require("../models/ordersModel");
//Get orders
const getOrders = async(req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            orders
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "problem in fetching orders",
            error
        })

    }
}



//Post orders

const addOrders = async(req, res) => {
    const { productName, productPrice, productDescription, productDiscountPrice, Cod, productsCategory, _id, productImg } = req.body;
    console.log(req.body)


    try {
        const orders = await Order.create({ productName, productPrice, productDescription, productDiscountPrice, Cod, productsCategory, _id, productImg });
        res.status(201).json({
            success: true,
            message: "Order successful",
            totalCount: orders.length,
            orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "problem in ordering products",
            error
        })


    }
}
module.exports = {
    getOrders,
    addOrders
}