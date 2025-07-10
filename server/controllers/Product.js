const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl, category} = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            imageUrl,
            category
        });

        await newProduct.save();

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while adding product"
        });
    }
}

exports.editProduct = async (req, res) => {
    try{
        const { productId, name, description, price, imageUrl, category,quantity,offer } = req.body;

        const product = await Product.findByIdAndUpdate(productId, {name, description, price, imageUrl, category, quantity, offer}, { new: true });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product edited successfully",
            product: product
        });
    }
    catch(e){
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Internal server error while editing product"
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try{
        const { productId } = req.body;

        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    }
    catch(e){
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Internal server error while deleting product"
        });
    }
}