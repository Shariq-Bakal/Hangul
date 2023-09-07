const express = require("express");
const { getOrders, addOrders } = require("../controllers/orderController");
const router = express.Router();


//GET Orders

router.get("/", getOrders);

//POST Orders
router.post("/", addOrders);


module.exports = router