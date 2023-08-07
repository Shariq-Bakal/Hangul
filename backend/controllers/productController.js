const fs = require("fs");

const Product = require("../models/productModel");

//Get all products

const getAllProducts = async(req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({
            success : true,
            message : "All products",
            totalCount : products.length,
            products});
    } catch(error) {
        res.status(500).json({
            success : false,
            message : "problem in fetching products",
            error
        })
    }
}

//Get single product

const getSingleProduct = async(req, res) => {
    try{
        const { id } = req.params
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400)
        }
        res.status(200).json({
            success : true,
            message : "Single product fetched successfully",
            product
        });
        } catch(error) {
            res.status(500).json({
                success : false,
                message : "problem in fetching single product",
                error
            })
        }
}



//Post product

const postProduct = async(req, res) => {
    const { productName, productPrice, productDescription, productDiscountPrice, Cod, productsCategory } = req.body;
    const {originalname,path} = req.file
    const imageParts = originalname.split(".") 
    const extension = imageParts[imageParts.length-1]
    const newPath  = path + "." + extension
    fs.renameSync(path,newPath)
    try {
        const newProduct = await Product.create({ productName, productPrice, productDescription, productDiscountPrice, Cod, productImg : newPath, productsCategory });
        res.status(201).json({
            success : true,
            message: "product successfully uploaded",
            newProduct
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "problem in uploading product",
            error
        })
    }
}


//Delete product

const deleteProduct = async(req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findOneAndDelete({ _id: id });
        if (!product) {
            return res.status(400)
        }
        res.status(204).json({
            success : true,
            message : "Product deleted successfully",
            product
        });
    } catch(error) {
        res.status(500).json({
            success : false,
            message : "problem in deleting product",
            error
        })
    }
}

module.exports = {
    getAllProducts,
    postProduct,
    getSingleProduct,
    deleteProduct
}