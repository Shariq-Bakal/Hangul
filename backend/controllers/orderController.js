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

const addOrders = async (req, res) => {

    const {orders} = req.body
    try {
        const currentOrders = await Order.insertMany({orders});
        res.status(201).json({
            message: "Product added to orders successfully",
            success: true,
            currentOrders
        })
    } catch (error) {
        res.status(500).json({
            message: "Problem in adding product to orders",
            success: false,
            error
        })
    }
}
module.exports = {
    getOrders,
    addOrders
}