const mongoose = require("mongoose");

const Schema = mongoose.Schema

const orderSchema = new Schema(
    {
      orders: [
        {
          type: Object,
        },
      ]
    },
    { timestamps: true }
  );

module.exports = mongoose.model("Order", orderSchema);